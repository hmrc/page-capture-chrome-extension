:warning: This extension has been deprecated and replaced by [accessibility-assessment-extension](https://github.com/hmrc/accessibility-assessment-extension) (which is automatically included with [ui-test-runner](https://github.com/hmrc/ui-test-runner)). Please see the associated [announcement](https://confluence.tools.tax.service.gov.uk/x/KoX0Lw) and [migration guide](https://confluence.tools.tax.service.gov.uk/x/JoPoLw) for further details. :warning:

# page-capture-chrome-extension

page-capture-chrome-extension captures the HTML, scripts and stylesheets of the loaded page and fires them to the
[accessibility-assessment-service](https://github.com/hmrc/accessibility-assessment/tree/main/accessibility-assessment-service/app) running in port 6010.
To avoid CORS restrictions, the service under test, and the accessibility-assessment-service should be running on localhost.

## Usage

Encode the extension to a Base64 encoded string as follows:

```bash
./encodeExtension.sh
```

The Base64 encoded string can then be used by [webdriver-factory](https://github.com/hmrc/webdriver-factory) to add the extension to an instantiated Chrome browser via Chrome options. Specifically, see the `addPageCaptureChromeExtension` function within [BrowserFactory](https://github.com/hmrc/webdriver-factory/blob/main/src/main/scala/uk/gov/hmrc/webdriver/BrowserFactory.scala).

## License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
