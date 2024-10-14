#!/usr/bin/env node

const { program } = require('commander');
require('./lightning_channel');

program
  .version('1.0-15-beta')
  .description('A CLI for Javascript')
  .option('-n, --ligthning <option', 'Lightning Channel')
  .option('-n, --dlc <option>', 'DLC')
  .option( '-n  --cancel <option>', 'Transition Cancel')
  .option( '-n  --fund <option>', 'Transition Fund')
  .option( '-n -oracle <option>', 'Transition Oracle')
  .action((options) => {
    console.log('Lightning Channel:', options.name);
    myLibraryFunction(options.lightning_channel); // Call the library function
  });

program.parse(process.argv);

