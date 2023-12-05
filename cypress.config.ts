import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://70.63.98.130:10080',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
      on('before:browser:launch', (browser, launchOptions) => {
        // `args` is an array of all the arguments that will
        // be passed to browsers when it launches
        console.log(launchOptions.args) // print all current args
        if (browser.family === 'chromium' || browser.name === 'chrome') {
          // auto open devtools
          launchOptions.args.push('--explicitly-allowed-ports=10080')
        }
        if(browser.name === 'edge'){
          launchOptions.args.push('-explicitly-allowed-ports=10080')
        }
        // whatever you return here becomes the launchOptions
        return launchOptions
      })
    },
  },
});
