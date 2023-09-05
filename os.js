const os = require("os");
console.log("Os version", os.version()); 
console.log("Free Memory", os.freemem()); 
console.log("Total Memory", os.totalmem()); 
console.log("Free Memory in percentage", ((os.freemem() / os.totalmem())*100).toFixed(2)); 
console.log("CPU", os.cpus()); 