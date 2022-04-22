const handleStateChange = x => undefined

function sendToServer(input) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
  xhr.open("POST", 'http://localhost:6010/api/capture-page', true)
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.send(JSON.stringify(input))
}

function getFromUrl(url) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    const handleStateChange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          res({
            filename: url.replace(/:/g, '-').replace(/\//g, '_-_'),
            contents: xhr.responseText
          })
        } else {
          res( {
            errorMessage: { failedUrl: url,
              message: 'Request to the URL failed to return a 2XX response',
              statusReceived: xhr.status}
          })
        }
      }
    }
    xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
    xhr.open("GET", url, true)
    xhr.send()
  })
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
