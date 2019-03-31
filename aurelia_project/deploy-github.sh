#!/bin/bash
au build --env dev
cd ../wit-tutors.github.io
git pull
cd ../tutors-au/
cp ../tutors-au/dist/* .
git add -A .
git commit -m "update"
git push
