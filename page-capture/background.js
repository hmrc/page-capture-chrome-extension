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
    return new Promise((res) => {
        fetch(url)
            .then(function(response) {
                response.text().then(function (text) {
                    res({
                        filename: url.replace(/:/g, '-').replace(/\//g, '_-_'),
                        contents: text
                    })
                });
            }).catch(function(err) {
            console.log("Something went wrong!", err);
        })
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