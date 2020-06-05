### Go Live
- set right settings in `config.production.php`
- run `npm run build-prod`
- copy `build_production` folder to webspace
- update `sitemap.xml` and upload to Google Search Console
- check `Google Page Speed Insights` for any issues
- make sure live `contact form` is still working
- make sure `robots.txt` will not cause any issues

### Clone for new website
- set website name and other options in config.php
- set Contact Request Server URL in contact.js
- set the right link to data privacy page in main.js
- set CI colors in _ci.scss
- move favicons to images folder and make sure they are named correctly
- add desired languages to languages array in config and make sure each page is available in that language (meta in blades)
- place desired logo in images folder
- add Google Analytics ID to google-analytics.blade.php