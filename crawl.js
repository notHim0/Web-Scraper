const {JSDOM} = require("jsdom")


async function crawlPage(baseURL, element1, element2){
    let spans = [];
    let topics = [];
    console.log(`actively crawling ${baseURL}`)
    try{
        const resp = await fetch(baseURL);
        if(resp.status>399){
            console.log(`error in status code: ${resp.status} on page: ${baseURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type");
        if(!contentType.includes("text/html")){
            console.log(`non html response: ${contentType} page: ${baseURL}`)
            return pages
        }
        const htmlBody = await resp.text();

        [spans, topics] = getDataFromHTML(htmlBody, element1, element2, baseURL);

    }catch(err){
        console.log(err)
    }
   
    return [spans, topics];
}

function getDataFromHTML(htmlBody, element1, element2, baseURL){
    const topics = [];
    const spans = [];
    const dom = new JSDOM(htmlBody);
    const headings = dom.window.document.querySelectorAll(element1);
    const spanEles = dom.window.document.querySelectorAll(element2);
    // const images = dom.window.document.querySelectorAll("img");

    try{
        for(const heading of headings){
                topics.push(heading.textContent)
            }
        for(const spanEle of spanEles){
            spans.push(spanEle.textContent);
        }
        // for(const image of images){
        //     const src = normalizeURL(baseURL, image.src)
        //     console.log(src);
        // }
    }catch(err){
        console.log(err)
    }
    return [spans, topics];
}
function normalizeURL(urlString, baseURL){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if(hostPath.length>1 && hostPath.slice(-1)==='/'){
        return hostPath.slice(0, -1);
    }else if(baseURL[0]==='/'){
        return `https://${urlObj.hostname}${baseURL}`
    }
    else{
        return hostPath;
    }
}
module.exports = {
    crawlPage
}