# Repository for PuZZleDucK.ORG

### Author

PuZZleDucK (Ben Minerds)

### History

- Deployed to Agility Hosting via FTP
- Upgraded to git based deployment
- Migrate previous content
- Updated during migration to Digital Ocean
- Added and updated nginx config
- Updated to material design, enabled caching
- Add GovHack and DataStory
- Add software licensing
- Add certbot ssl
- Add php test page
- script updates
- Add python
- Moved blog to GitLab Jekyll
- Update to Rails site

### Next

- Add python projects
- bash? more linux? ...


## Rails

* Ruby/Rails: 3.1/7.1.3
* System dependencies: Docker/SSH
* Configuration: .env
* Database sqlite3
* Test: rspec/webdriver
* Services (job queues, cache servers, search engines, etc.)
* Deployment: Kamal
* ...

## Docker

* `docker build -t puzzleduck.org .` # Build image
* `docker volume create puzzleduck.org-storage` # Make storage volume
* `docker run --rm -it -v puzzleduck.org-storage:/rails/storage -p 3001:3001 --env RAILS_MASTER_KEY=<your-config-master-key> puzzleduck.org` # Run image
* `docker tag puzzleduck.org:latest puzzleduck/puzzleduck.org:latest` # tag for publishing
* `docker login`
* `docker push puzzleduck/puzzleduck.org:latest` # eg publish