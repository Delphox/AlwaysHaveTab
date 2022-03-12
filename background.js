//This serves two functions. Restart after tabs are closed or click on extension to restart session.
var count = 0;

const closeAllTabs = ()=>{
	chrome.tabs.create({ url: 'chrome://bookmarks' }, function (newTab) {
		let querying = chrome.tabs.query({}, function (tabs) {
			for (let tab of tabs) {
				if (tab.id !== newTab.id) chrome.tabs.remove(tab.id);
			}
		});
	});
}

chrome.action.onClicked.addListener(function (thisTab) {
	closeAllTabs();
});

chrome.tabs.onRemoved.addListener(() => {
chrome.tabs.query({currentWindow: true}, (tabs) => {

  if( tabs.length === 0 && count === 0){
	count = 1;
	chrome.tabs.create({ url: 'chrome://bookmarks' });
	setTimeout(function(){ count = 0; }, 500);
  }
})
})
