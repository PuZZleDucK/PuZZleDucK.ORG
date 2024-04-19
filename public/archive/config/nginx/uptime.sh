#!/bin/bash
ps -p `cat /run/nginx.pid` -o etime=
