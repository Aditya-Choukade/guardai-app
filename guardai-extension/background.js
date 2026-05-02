const API_BASE = "http://localhost:8080";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "guardai-check",
    title: "Check with GuardAI",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "guardai-check") return;

  const selectedText = info.selectionText?.trim();
  if (!selectedText) return;

  // Store selected text immediately so popup can show loading state
  await chrome.storage.session.set({
    guardai_state: { status: "loading", text: selectedText }
  });

  // Open the popup by triggering the extension action
  await chrome.action.openPopup().catch(() => {
    // openPopup() can fail in some Chrome versions — fallback to injecting popup
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width: 400,
      height: 520,
      top: 100,
      left: Math.round((tab.width || 1200) / 2 - 200)
    });
  });

  // Call the API in the background
  try {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText })
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();

    await chrome.storage.session.set({
      guardai_state: {
        status: "done",
        text: selectedText,
        result: data
      }
    });

    // Notify the popup that results are ready
    chrome.runtime.sendMessage({
      type: "GUARDAI_RESULT_READY",
      result: data,
      text: selectedText
    }).catch(() => {}); // Popup may not be open yet — that's fine, it will poll

  } catch (error) {
    await chrome.storage.session.set({
      guardai_state: {
        status: "error",
        text: selectedText,
        error: error.message
      }
    });

    chrome.runtime.sendMessage({
      type: "GUARDAI_ERROR",
      error: error.message
    }).catch(() => {});
  }
});
