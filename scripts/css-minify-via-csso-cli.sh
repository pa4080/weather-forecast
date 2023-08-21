#!/bin/bash

# @see https://www.npmjs.com/package/csso
# @see https://github.com/css/csso-cli

cd "../public/css/weather-icons"
for file in *{icons,wind}.css; do
  echo -e "\nMinifying $file"
  npx csso --input "$file" --output "${file%.css}.min.css"
done
