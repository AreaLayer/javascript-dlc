#!/usr/bin/env node

const { program } = require('commander');
const { lightning_channel } = require('./lightning_channel');

program
  .version('1.0.0')
  .description('A CLI for Javascript')
  .option('-n, --ligthnin <option', 'Lightning Channel')
  .action((options) => {
    console.log('Lightning Channel:', options.name);
    myLibraryFunction(options.lightning_channel); // Call the library function
  });

program.parse(process.argv);
