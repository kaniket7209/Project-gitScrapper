//homepage / topic

let url = "https://github.com/topics";
const request = require('request')
const cheerio = require('cheerio')
const getreposLink = require('./reposPage')

request(url,function(err,response,html){
    if(err){
        console.log("Error");
    }
    else{
        // console.log(html);
        gettopicLinks(html);
    }
})
//css selector & cheerio -> reading html
function gettopicLinks(html){
    //read htlm->cheerio
    let $ = cheerio.load(html);
    let topicEleArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    let topicName = $(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");

    //3 topics
    for(let i = 0;i < topicEleArr.length;i++){
        let href = $(topicEleArr[i]).attr("href");
        // console.log(href);
        let topic = href.split("/").pop();
        let fulllink = `https://github.com${href}`;
        // console.log(topic);
        
        // console.log(fulllink);
        getreposLink(fulllink,topic);
        // console.log(`----------------`);
    }
    // console.log(topicName.text());

}