#!/bin/sh

rm -rf dist/*

npm run build

cp package.json dist/
cp README.txt dist/
cp tsconfig.json dist/

cd dist

npm pack --dry-run

mv index.mjs index.js
mv index.d.mts index.d.ts

mv crypto/index.mjs crypto/index.js
mv crypto/index.d.mts crypto/index.d.ts

npm publish
