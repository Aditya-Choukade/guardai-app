const root = document.getElementById('root');
const headerSub = document.getElementById('header-sub');
const checkAnotherBtn = document.getElementById('check-another-btn');

function flagLabel(flag) {
  return flag.replace(/_/g, ' ');
}

function verdictIcon(verdict) {
  const v = verdict?.toLowerCase();
  if (v === 'dangerous') return '🚨';
  if (v === 'suspicious') return '⚠️';
  if (v === 'safe') return '✅';
  return '🔍';
}

function renderLoading(text) {
  headerSub.textContent = 'Analyzing...';
  checkAnotherBtn.style.display = 'none';
  root.innerHTML = `
    ${text ? `<div class="message-preview">${escHtml(text.slice(0, 120))}</div>` : ''}
    <div class="loading">
      <div class="spinner"></div>
      <div class="loading-text">Checking for threats</div>
      <div class="loading-sub">Analyzing message + URLs</div>
    </div>
  `;
}

function renderResult(result, text) {
  const v = result.verdict?.toLowerCase() || 'safe';
  const pct = Math.round((result.confidence || 0) * 100);
  headerSub.textContent = result.verdict;
  checkAnotherBtn.style.display = 'block';

  const urlsHtml = (result.urls_found?.length > 0) ? `
    <div class="url-section">
      <div class="url-label">URLs found (${result.urls_found.length})</div>
      ${result.urls_found.map(u => `
        <div class="url-item">
          <div class="url-dot ${u.url_verdict?.toLowerCase() || 'safe'}"></div>
          <div class="url-text">${escHtml(u.url)}</div>
          ${u.virustotal_score ? `<div class="url-score">${escHtml(u.virustotal_score)}</div>` : ''}
        </div>
      `).join('')}
    </div>
  ` : '';

  const flagsHtml = (result.flags?.length > 0) ? `
    <div class="flags">
      ${result.flags.map(f => `<span class="flag-chip ${f}">${flagLabel(f)}</span>`).join('')}
    </div>
  ` : '';

  root.innerHTML = `
    ${text ? `<div class="message-preview">${escHtml(text.slice(0, 100))}</div>` : ''}
    <div class="verdict-section">
      <div class="verdict-badge ${v}">
        <div class="verdict-icon">${verdictIcon(result.verdict)}</div>
        <div class="verdict-label">${escHtml(result.verdict?.toUpperCase() || 'UNKNOWN')}</div>
        <div class="verdict-confidence">${pct}% confident</div>
      </div>
      <div class="explanation">${escHtml(result.explanation || 'No explanation available.')}</div>
      ${flagsHtml}
      <div class="action-box ${v}">
        <div class="action-label">What to do</div>
        ${escHtml(result.action || 'No action required.')}
      </div>
    </div>
    ${urlsHtml}
  `;
}

function renderError(message) {
  headerSub.textContent = 'Error';
  checkAnotherBtn.style.display = 'block';
  root.innerHTML = `
    <div class="error-box">
      <div class="error-icon">⚡</div>
      <div class="error-title">Could not analyze</div>
      <div class="error-msg">${escHtml(message || 'Unknown error. Check that the GuardAI backend is running.')}</div>
    </div>
  `;
}

function renderEmpty() {
  headerSub.textContent = 'Ready';
  root.innerHTML = `
    <div class="empty">
      <div class="empty-icon">🛡️</div>
      <div class="empty-text">
        Select any suspicious text on a webpage,<br>
        right-click, and choose<br>
        <strong>"Check with GuardAI"</strong>
      </div>
    </div>
  `;
}

function resetState() {
  chrome.storage.session.remove('guardai_state');
  renderEmpty();
  checkAnotherBtn.style.display = 'none';
  headerSub.textContent = 'Fraud Detector';
}

checkAnotherBtn.addEventListener('click', resetState);

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyState(state) {
  if (!state) { renderEmpty(); return; }
  if (state.status === 'loading') { renderLoading(state.text); return; }
  if (state.status === 'done') { renderResult(state.result, state.text); return; }
  if (state.status === 'error') { renderError(state.error); return; }
  renderEmpty();
}

// On popup open — read current state immediately
chrome.storage.session.get('guardai_state', ({ guardai_state }) => {
  applyState(guardai_state);
});

// Listen for live updates from background.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'GUARDAI_RESULT_READY') {
    renderResult(message.result, message.text);
  }
  if (message.type === 'GUARDAI_ERROR') {
    renderError(message.error);
  }
});

// Poll every 500ms as fallback for openPopup() timing issues
let pollInterval = setInterval(() => {
  chrome.storage.session.get('guardai_state', ({ guardai_state }) => {
    if (guardai_state?.status === 'done' || guardai_state?.status === 'error') {
      clearInterval(pollInterval);
      applyState(guardai_state);
    }
  });
}, 500);

// Stop polling after 15s regardless
setTimeout(() => clearInterval(pollInterval), 15000);
