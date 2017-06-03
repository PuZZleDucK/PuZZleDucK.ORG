#!/bin/bash
mkdir /home/user/backups

STAMP=`date --rfc-3339=ns | tr "+ ." "_"`
echo
echo ":: BACKING UP CONFIG"
cp -vf /etc/nginx/sites-available/puzzleduck.org /home/user/backups/"$STAMP"_puzzleduck.org
cp -vf /etc/nginx/sites-available/test.org /home/user/backups/"$STAMP"_test.org
cp -vf /etc/nginx/nginx.conf /home/user/backups/"$STAMP"_nginx.conf

echo
echo ":: INSTALLING NEW CONFIG"
sudo cp -vf config/nginx/sites-available/puzzleduck.org /etc/nginx/sites-available/puzzleduck.org
sudo cp -vf config/nginx/sites-available/test.org /etc/nginx/sites-available/test.org
sudo cp -vf config/nginx/nginx.conf /etc/nginx/nginx.conf

echo
echo ":: TESTING NGINX"
sudo nginx -t -c /etc/nginx/nginx.conf

echo
echo ":: RESTARTING NGINX"
sudo nginx -s reload
