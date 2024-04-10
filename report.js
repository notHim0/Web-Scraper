const fs = require('fs');

function report(...input){
    input.forEach((array, index) => {
        let arrData = JSON.stringify(array);

        fs.writeFile(`./report/file${index}.json`, arrData, (err)=>{
            if(err){
                console.error(`File write unsuccessfull for file${index}.json ${err}`);
                process.exit(1);
            }
            console.log(`File write successfull for file${index}.json`);
        });
    })
}

module.exports = {report};