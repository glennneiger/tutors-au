#!/bin/bash
au build --env dev
cd ../wit-tutors.github.io
git pull
cp ../tutors-au/dist/* .
git add -A .
git commit -m "update"
git push
