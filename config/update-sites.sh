#!/bin/bash

echo ":: Updating puzzleduck.org"
cd /var/www/puzzleduck.org
git pull

echo ":: Updating other projects"
# cd /home/user/projects/blah
# git pull
