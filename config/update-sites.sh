#!/bin/bash

echo ":: Updating puzzleduck.org"
cd /var/www/puzzleduck.org
git pull

echo ""
echo ":: Updating other projects"
cd /home/user/x/ipgod
git pull
