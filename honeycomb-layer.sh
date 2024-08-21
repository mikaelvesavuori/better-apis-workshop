#!/bin/bash

# NOTE: This is completely optional!
#
# This script adds the Honeycomb integration layer on top of your functions, as a Lambda Layer.
# If you changed the function and/or stack names, make sure to update them below.
#
# Reference: https://github.com/honeycombio/honeycomb-lambda-extension

REGION="eu-north-1"
ARCH="arm64" #"x86_64"
VERSION="v11-1-2:1"

aws lambda update-function-configuration \
  --function-name "better-apis-demo-shared-FakeUser" \
  --region $REGION \
  --layers "arn:aws:lambda:$REGION:702835727665:layer:honeycomb-lambda-extension-$ARCH:$VERSION"

aws lambda update-function-configuration \
  --function-name "better-apis-demo-shared-FeatureToggles" \
  --region $REGION \
  --layers "arn:aws:lambda:$REGION:702835727665:layer:honeycomb-lambda-extension-$ARCH:$VERSION"

aws lambda update-function-configuration \
  --function-name "better-apis-demo-shared-Authorizer" \
  --region $REGION \
  --layers "arn:aws:lambda:$REGION:702835727665:layer:honeycomb-lambda-extension-$ARCH:$VERSION"
