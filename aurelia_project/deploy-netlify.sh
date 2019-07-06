#!/bin/bash
au build --env prod
#au build --env dev
cd ../wit-tutors-staging.github.io
git pull
cp ../tutors-au/dist/* .
git add -A .
git commit -m "update"
git push
