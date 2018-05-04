#!/usr/bin/env bash

# see: https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -e # exit immediately if a pipeline returns a non-zero status
set -x # print a trace of simple commands

basicCommand="yarn react-native bundle --dev=false --verbose"

$basicCommand \
    --platform=ios \
    --entry-file=./app/hotels/index.js \
    --bundle-output=./native/ios/RNHotels/Pod/Assets/RNHotels.js \
    --assets-dest ./native/ios/RNHotels/Pod/Assets/