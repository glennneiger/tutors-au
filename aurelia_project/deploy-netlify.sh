#!/bin/bash
au build --env prod
cd ../wit-tutors.github-staging.io
git pull
cp ../tutors-au/dist/* .
git add -A .
git commit -m "update"
git push
