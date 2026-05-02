// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTION") {
    const selection = window.getSelection()?.toString()?.trim() || "";
    sendResponse({ selection });
    return true;
  }

  if (message.type === "HIGHLIGHT_TEXT") {
    // Optional: briefly highlight analyzed text
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const mark = document.createElement("mark");
      mark.style.cssText = `
        background: rgba(127, 119, 221, 0.25);
        border-radius: 2px;
        transition: background 0.3s;
      `;
      try {
        range.surroundContents(mark);
        setTimeout(() => {
          mark.outerHTML = mark.innerHTML;
        }, 3000);
      } catch (e) {
        // Selection spans multiple elements — skip highlighting
      }
    }
    sendResponse({ ok: true });
    return true;
  }
});
