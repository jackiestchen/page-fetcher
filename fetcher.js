const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  ouput: process.stdout
});


const url = process.argv[2];
const path = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.log(`${error}`);
    console.log(`Please input valid URL`);
    rl.close();
  } 
  else {
    const fileSize = response.headers['content-length'];

    const writeFile = () => {
      fs.writeFile(path, body, err => {
        if (err) {
          console.log(err);
          return;
        }
      })
    };

    const overWrite = () => {
      console.log('File exists. Overwrite? Y/N');
      rl.on('line', (input) => {
        if (input === "Y" || input === "y") {
          writeFile();
          console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
          rl.close();
        } else {
          console.log(`Download cancelled.`);
          rl.close();
        }
      })
    }


    fs.stat(path, (err, stats) => {
      if (!stats) {
        writeFile();
      } else {
        overWrite();
      }
    });

  }

  // console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
})