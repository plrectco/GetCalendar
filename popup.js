function onclick() {
  chrome.tabs.query({active:true, currentWindow: true}, function (tabs) {
    var date = document.getElementById("date").value;
    chrome.tabs.sendMessage(tabs[0].id, {ok:"ok", date:date});
  });
}
window.addEventListener('load', function(evt) {
    document.getElementById('save').addEventListener('click', onclick);
});
