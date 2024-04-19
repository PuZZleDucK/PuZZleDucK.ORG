#!/bin/bash

echo
echo ":: Force Renew Certbot"
echo ":: Note: you should use the webroot '/var/www/html'"

sudo certbot certonly --force-renew -d puzzleduck.org -d www.puzzleduck.org
