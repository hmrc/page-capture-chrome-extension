function sendToServer(input){
    fetch("http://localhost:6010/api/capture-page", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
     .then((response) => response)
}

function getFromUrl(url) {
  return fetch(url);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery === 'sendToServer') {
    sendToServer(request.input)
  }
  if (request.contentScriptQuery === 'getFromUrl') {
    getFromUrl(request.input).then(output => sendResponse(output))
    return true
  }
})