#!/bin/bash
au build --env prod
cd ../wit-tutors-staging.github.io
git pull
cp ../tutors-au/dist/* .
git add -A .
git commit -m "update"
git push
