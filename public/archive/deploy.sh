#!/bin/bash
git push origin master
ssh user@puzzleduck.org "cd /var/www/puzzleduck.org/ ; git pull"
