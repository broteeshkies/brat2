#!/usr/bin/env bash
cd packages/app
../../node_modules/concurrently/bin/concurrently.js -rki  \
    "npm run watch" \
    " \
       sleep 3 && \
       npm run dev \
    "

cd ../..
