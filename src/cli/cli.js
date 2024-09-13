#!/usr/bin/env node

const { program } = require('commander');
const { myLibraryFunction } = require('./lib');  // Import your library functions here

program
  .version('1.0.0')
  .description('A CLI for My Library')
  .option('-n, --name <name>', 'Provide a name')
  .action((options) => {
    console.log('Name:', options.name);
    myLibraryFunction(options.name); // Call the library function
  });

program.parse(process.argv);
