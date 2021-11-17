const request = require('request')
const cheerio = require('cheerio')
const getissueslink = require('./issues')

function getreposLink(url,topic) {
    request(url, cb);
    function cb(err,response,html){
        if(err){
            console.log("error");
        }
        else{
            // console.log(html);
            getLink(html);
        }
    }
    function getLink(html){
        //read html -> cheerio
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
        //30 items
        console.log(topic);
        for(let i = 0;i < 8;i++){
            let twoanchors = $(headingsArr[i]).find("a");
            let link = $(twoanchors[1]).attr("href");
            // console.log(link);
            let fullLink = `https://github.com${link}`;
            // console.log(fullLink);// full link
            //issue page link

            let repoName = link.split("/").pop();
            let issuePageLink =`${fullLink}/issues`;
            console.log(issuePageLink);// full link
            getissueslink(issuePageLink,topic,repoName);

        }
        console.log(`----------------`);
    }


}
module.exports = getreposLink;
