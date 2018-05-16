nvm install v9.11.1
nvm use v9.11.1
# cloud functions uses v6.14.0 but not so sure that I care within a local running npm
npm install -g polymer-cli
npm install -g bower
npm install -g firebase-tools
npm install -g web-component-tester
bower install
chmod a+x deploy.sh
chmod a+x commit.sh
chmod a+x init.sh
# you should need this as well, running in the functions dir npm install firebase-admin@5.5.0
