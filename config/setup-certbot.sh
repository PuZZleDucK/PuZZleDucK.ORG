#!/bin/bash

echo
echo ":: SETUP Repository"
sudo add-apt-repository --yes ppa:certbot/certbot
sudo apt-get update

echo
echo ":: INSTALLING Certbot"
sudo apt-get install --yes python-certbot-nginx

echo
echo ":: ENABLING UFW SSL"
sudo ufw allow 'Nginx Full'

echo
echo ":: INTERACTIVE: Run certbot"
echo "Now run:"
echo "    sudo certbot --nginx -d puzzleduck.com -d www.puzzleduck.com"
echo "Then backup config:"
echo "    sudo tar zcvf /home/user/letsencrypt_backup_$(date +'%Y-%m-%d_%H%M').tar.gz /etc/letsencrypt"
echo "    tar tvf /home/user/letsencrypt_backup_<date>.tar.gz"
echo "To restore:"
echo "    tar zxvf /home/user/letsencrypt_backup_<date>.tar.gz -C /"

echo
echo ":: UPDATE Paramaters"
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

echo ":: Reload Nginx"
config/setup-nginx.sh

echo
echo ":: INTERACTIVE: Update crontab"
echo "Now run:"
echo "    sudo crontab -e"
echo "Add:"
echo "    30 2 * * * /usr/bin/certbot renew --quiet"

echo
echo ":: Restart Nginx"
