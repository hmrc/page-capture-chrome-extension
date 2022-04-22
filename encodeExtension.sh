#!/bin/bash

OS="`uname`"
case $OS in
  'Linux')
    $(which google-chrome-stable) --pack-extension=page-capture
    ;;
  'Darwin')
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --pack-extension=page-capture
    ;;
  *) ;;
esac

base64 -i page-capture.crx

rm page-capture.crx || true
rm page-capture.pem || true
