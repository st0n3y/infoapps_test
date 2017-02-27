I used Yarn as my package manager, so you will need to install it if you haven't already. On Mac:

  brew update
  brew install yarn

On Windows, visit the Yarn website for instructions:

  https://yarnpkg.com/lang/en/docs/install/#windows-tab

Then, cd into infoapps_test and run: 

  yarn install

Once all dependencies have been installed, start the server by running:

  yarn start

To view the app, point your browser of choice at:

  http://localhost:8080

You may experience a Cross-Origin Resource Sharing error when the form tries to autofill fields using the postcode. If you do, I suggest installing the Allow-Control-Allow-Origin extension for Chrome and activating it:

https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US