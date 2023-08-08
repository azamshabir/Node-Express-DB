// Read data from file

const fs = require('fs');

// Synchronous execution - Blocking code execution
const textInput = fs.readFileSync('./Files/input.txt','utf-8');
console.log(textInput);

const textOutput = `This is write operation . Current Date : ${Date.now}`;
fs.writeFileSync('./Files/output.txt', textOutput);

// Asynchronous / Non Blocking Code
console.log('--------- Asynchronous Data Reading ------------');

fs.readFile('./Files/input.txt','utf8', (err, data) => {
    console.log(data);
});

fs.readFile('./Files/A.txt','utf8', (err, data1) => {
    fs.readFile('./Files/B.txt','utf8',(err, data2) => {
        console.log(data2);
        fs.readFile('./Files/C.txt','utf8', (err, data3) => {
            fs.writeFile('./Files/D.txt',`${data1} \n ${data2} \n ${data3}` ,'utf8', err => {
                console.log('Your file has been written');
            });
        });
    })
});