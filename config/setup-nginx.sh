
mkdir /home/user/backups

echo "BACKING UP CONFIG"
cp -f /etc/nginx/sites-available/origional-default /home/user/backups/
cp -f /etc/nginx/sites-available/puzzleduck.org /home/user/backups/
cp -f /etc/nginx/sites-available/test.org /home/user/backups/
cp -f /etc/nginx/nginx.conf /home/user/backups/

echo "INSTALLING NEW CONFIG"
cp -f nginx/sites-available/origional-default /etc/nginx/sites-available/origional-default
cp -f nginx/sites-available/puzzleduck.org /etc/nginx/sites-available/puzzleduck.org
cp -f nginx/sites-available/test.org /etc/nginx/sites-available/test.org
cp -f nginx/nginx.conf /etc/nginx/nginx.conf

