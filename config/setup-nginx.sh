
mkdir /home/user/backups

echo "BACKING UP CONFIG"
cp -f /etc/nginx/sites-available/puzzleduck.org /home/user/backups/
cp -f /etc/nginx/sites-available/test.org /home/user/backups/
cp -f /etc/nginx/nginx.conf /home/user/backups/

echo "INSTALLING NEW CONFIG"
sudo cp -f config/nginx/sites-available/puzzleduck.org /etc/nginx/sites-available/puzzleduck.org
sudo cp -f config/nginx/sites-available/test.org /etc/nginx/sites-available/test.org
sudo cp -f config/nginx/nginx.conf /etc/nginx/nginx.conf

echo "RESTARTING NGINX"
sudo nginx -s reload
