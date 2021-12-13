#!/bin/bash
set -e

# RUN SMOKE TEST
# Expects input parameter with an URL
# Checks for status code 200

URL=$1
STATUS_RESPONSE=$(curl -s -o /dev/null -H "X-Client-Version: 1" -H "Authorization: legacyuser@company.com" -w "%{http_code}" $URL)

if [ "$STATUS_RESPONSE" == 200 ]
then
  echo Worked just fine && exit 0
else
  echo Yep that broke something && exit 1
fi