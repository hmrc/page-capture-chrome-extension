var matchSrcAttLocalResource = RegExp('(^http:\/\/localhost:[0-9]{4,5})|(^[\.\/]{1}[a-zA-Z]{1}[\/a-zA-Z0-9-\.]+$)')

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
  return new Promise(function (res, rej) {
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

forEachNode(shadow.querySelectorAll('script'), script => {
  if (script.src && matchSrcAttLocalResource.test(script.getAttribute('src'))) {
    promisesToWaitFor.push(
      getFromUrl(script.getAttribute('src'))
        .then(output => {
          files[output.filename] = output.contents
          script.setAttribute('src', './' + output.filename)
          if(output.errorMessage != null) {
            errors.push(output.errorMessage)
          }
        }
      )
    )
  }
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
