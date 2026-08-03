#!/usr/bin/env bash
set -e
ZIPNAME="wix-clone-ecommerce.zip"
rm -f "$ZIPNAME"
zip -r "$ZIPNAME" frontend backend README.md
echo "Created $ZIPNAME"
