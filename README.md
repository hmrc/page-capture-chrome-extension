
# page-capture-chrome-extension

page-capture-chrome-extension captures the HTML, scripts and stylesheets of the loaded page and fires them to the
[accessibility-assessment-service](https://github.com/hmrc/accessibility-assessment/tree/main/accessibility-assessment-service/app) running in port 6010.
To avoid CORS restrictions, the service under test, and the accessibility-assessment-service should be running on localhost.

### License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
