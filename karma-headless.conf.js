process.env.CHROME_BIN = require('puppeteer').executablePath();
const path = require('path');

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('@angular-devkit/build-angular/plugins/karma'),
        require('karma-sonarqube-unit-reporter')
      ],
      client: {
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, './reports/coverage'),
        reports: ['html', 'lcovonly', 'text-summary'],
        fixWebpackSourcePaths: true
      },
      sonarQubeUnitReporter: {
        sonarQubeVersion: 'LATEST',
        outputFile: 'reports/ut_report.xml',
        useBrowserName: false
      },
      reporters: ['progress', 'sonarqubeUnit', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['ChromeHeadless'],
      // Fix for: ChromeHeadless stderr: [0522/051708.014478:FATAL:zygote_host_impl_linux.cc(116)] No usable sandbox!
      customLaunchers: {
        'ChromeHeadless': {
            base: 'Chrome',
            flags: [
            '--headless',
            // Required for Docker version of Puppeteer
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // This will write shared memory files into /tmp instead of /dev/shm,
            // because Docker’s default for /dev/shm is 64MB
            '--disable-dev-shm-usage',
            // Without a remote debugging port, Google Chrome exits immediately.
            '--remote-debugging-port=9222'
            ],
            debug: true
        }
      },
      singleRun: true,
      restartOnFileChange: true
    });
  };
  