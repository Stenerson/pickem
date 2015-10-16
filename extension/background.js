// Called when the url of a tab changes.
function checkForShowPageAction(tabId, changeInfo, tab) {
  var url = tab.url;
  // I'm sure there's a better way to do this. :-) Submit a PR
  if (url.indexOf('yahoo') > 0 && url.indexOf('pickem') > 0 && url.indexOf('grouppicks') > 0) {
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForShowPageAction);

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {});
});
