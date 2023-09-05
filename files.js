const fs = require("fs"); // inbuild package-file system. 
fs.readFile("./awesome.txt", "utf-8", (err, data)=>{
    console.log(data);
})

const niceQuote = "Make everyday a little less oridinary"; 
fs.writeFile ("./cool.txt",niceQuote, (err)=>{
    console.log("Completed Writing!!!"); 
} )

const bulkQuote ="Live more, worry less"; 

const [, , num1 ] = process.argv;


const newQuote = "\nMake everyday a less oridinary"; 
fs.appendFile ("./fun.html",newQuote, (err)=>{
    console.log("Completed Updating!!!"); 
} )