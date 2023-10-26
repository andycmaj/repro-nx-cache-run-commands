const hashFiles = require('hash-files');

const [_, __, ...files] = process.argv;

// console.log('hashing files for cache input', files);

/**
 * This file exists so that we can call hash-files in a cross-platform way.
 * The cli tool from the hash-files library doesn't work with powershell without crazy escaping.
 * So this tool allows space-separated file array as args
 */
hashFiles(
  {
    files
  },
  (error, hash) => {
    if (error) {
      console.error(error);
      console.log('Error hashing files', files);
      process.exit(1);
    }

    console.log(hash);
    process.exit(0);
  }
);
