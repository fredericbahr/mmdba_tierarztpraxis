#!/bin/sh
echo "\ninstalling global dependencies:"
npm ci
cd server
echo "\ninstalling server dependencies:"
npm ci
cd ../client
echo "\ninstalling client dependencies:"
npm ci