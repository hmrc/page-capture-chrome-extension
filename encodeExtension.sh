#!/bin/bash

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --pack-extension=page-capture

base64 -i page-capture.crx

rm page-capture.crx || true
rm page-capture.pem || true
