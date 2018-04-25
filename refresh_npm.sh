nvm install v6.14.0
nvm use v6.14.0 # because of cloud functions, otherwise would use latest
npm install -g polymer-cli
npm install -g bower
npm install -g firebase-tools
npm install -g web-component-tester
bower install
chmod a+x deploy.sh
chmod a+x commit.sh
chmod a+x init.sh
# you should need this as well, running in the functions dir npm install firebase-admin@5.5.0
