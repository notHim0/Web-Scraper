const {crawlPage} = require('./crawl');
const { report } = require('./report')

async function main(){
    if(process.argv.length<3){
        console.log('no website provided')
        process.exit(1)
    }
    if(process.argv.length>5){
        console.log("too many arguements")
        process.exit(1)
    }

    const baseURL = process.argv[2];
    const ele1 = process.argv[3];
    const ele2 = process.argv[4];
    console.log("Starting crawl of "+ baseURL)
    const [spans, topics] = await crawlPage(baseURL, ele1, ele2);


    report(spans, topics);
}

main()