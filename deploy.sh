#!/bin/bash

sudo rm -rf api/public/*.css
sudo rm -rf api/public/*.js
sudo rm -rf api/public/*.txt
sudo rm -rf api/public/*.png
sudo rm -rf api/public/*.ico
sudo rm -rf api/public/*.ttf
sudo rm -rf api/public/*.svg
sudo rm -rf api/public/*.woff
sudo rm -rf api/public/*.woff2
sudo rm -rf api/public/*.eot

sudo mv client/dist/index.html api/resources/views/index.html
sudo cp client/dist/* api/public
sudo rm -rf client/dist