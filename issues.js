const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const pdfkit = require('pdfkit')

function getissueslink(url,topic,repoName){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log("error");
        }
        else{
            // console.log(html);
            getissuesPagehtml(html);
        }
    }

    function getissuesPagehtml(html){
        // /read html
        let $ = cheerio.load(html);
        let issuesAr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        //23 potions
        // console.log(issuesAr.length)
      
        let arr = [];
        for(let i = 0;i < issuesAr.length;i++){
            let link = $(issuesAr[i]).attr("href");
            // let issuesName = $(issuesAr[i]).text();
            // console.log(link);
            arr.push(link);
        }
        //folder of topics
        let folderPath = path.join(__dirname,topic);
        dirCreater(folderPath);
        //reponame
        let filePath = path.join(folderPath,repoName+".pdf");
        let text = JSON.stringify(arr);
        // fs.writeFileSync(filePath);

        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();


        
    }
}

function dirCreater(folderPath){
    if(fs.existsSync(folderPath)==false){
        fs.mkdirSync(folderPath);
    }
}
module.exports = getissueslink;