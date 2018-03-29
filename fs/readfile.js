var fs= require('fs');
var math = require('.\math.js');
var chalk = require('chalk');
console.log(module); // module is not a global object like console.log
console.log('Async begins');
var options = {encoding: 'utf8', flag: 'r'};
fs.readFile('./data.txt',options,function(err,fileData){
    if(err){
        console.log('File is not found');
    }else
    {
        console.log(fileData + " Async");
    }
});
console.log('Async ends');

console.log('sync begins');
var data = fs.readFileSync('./data.txt',options,);
console.log(data);
console.log(data.toString());
console.log('sync ends');
console.log(chalk.blue('Hello world!'));
console.log(chalk.blue.bgRed.bold('Hello world!'));


