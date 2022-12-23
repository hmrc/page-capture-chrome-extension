function absoluteUrl(url) {
  const link = document.createElement("a");
  link.href = url;
  return link.href;
}

function sendToServer(input) {
  chrome.runtime.sendMessage({
    contentScriptQuery: 'sendToServer',
    input: input
  })
}

function getFromUrl(url) {
  return new Promise(function (res) {
    chrome.runtime.sendMessage({
        contentScriptQuery: 'getFromUrl',
        input: absoluteUrl(url)
      },
      function (response) {
        res(response)
      })
  })
}

const forEachNode = (elementNodeListOf, iterator) => [].concat(...elementNodeListOf).forEach(iterator)
const files = {}
const promisesToWaitFor = []
const errors = []

const shadow = document.documentElement.cloneNode(true)

forEachNode(shadow.querySelectorAll('link[rel=stylesheet]'), sheet => {
  promisesToWaitFor.push(getFromUrl(sheet.getAttribute('href'))
    .then(output => {
      if (output === undefined) {
        errors.push('output is undefined.')
        return
      }
      files[output.filename] = output.contents
      sheet.setAttribute('href', './' + output.filename)
      if(output.errorMessage != null) {
        errors.push(output.errorMessage)
      }
    }
  ))
})

Promise.all(promisesToWaitFor).then(function () {
  sendToServer({
    pageURL: window.document.location.href,
    pageHTML: shadow.outerHTML,
    timestamp: new Date().getTime(),
    files: files,
    errors: errors
  })
})
