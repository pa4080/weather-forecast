#!/bin/bash

# Run the script from the root of the project!

# @see https://www.npmjs.com/package/csso
# @see https://github.com/css/csso-cli

cd "public/assets/css/weather-icons"
for file in *{icons,wind}.css; do
  echo -e "\nMinifying $file"
  npx csso --input "$file" --output "${file%.css}.min.css"
done
