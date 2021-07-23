var https = require("https");
var fs = require('fs');
var request = require('request');

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback).on('error', error => {
        console.log(error.message);
        });
    });
};

for (let i = 0; i <= 3; i++ ) {

    let page = i + 1
    let url = `https://www.chinovalleyranchers.com/wp-json/wp/v2/posts/?page=${page}&per_page=100`
    console.log(`URL: ${url}`)

    https.get(url, function(res){
        let body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            let wpResponse = JSON.parse(body);
            // EACH ARTICLE
            wpResponse.map((article, index) => {
                let tempArticle = {}
                let mediaURL = `https://www.chinovalleyranchers.com/wp-json/wp/v2/media/${article.featured_media}`
                tempArticle.title = article.title.rendered
                tempArticle.slug = article.slug
                // Image Request
                /*
                https.get(mediaURL, function(res){
                    let body = '';

                    res.on('data', function(chunk){
                        body += chunk;
                    });

                    res.on('end', function(){
                        let wpmResponse = JSON.parse(body);
                        // Get Media Location
                        let mediaLocation = wpmResponse.source_url
                        let mediaTitle = `/test-images/${wpmResponse.media_details.sizes.full.file}`
                        download(mediaLocation, mediaTitle, function(){
                            console.log(`Downloaded: ${mediaTitle}`);
                            tempArticle.image.src = `/images/${mediaTitle}`
                            tempArticle.image.alt = wpmResponse.alt_text
                        })
                    });
                })
                */
                // DATE
                tempArticle.date = article.date
                tempArticle.author = "Chino Valley Ranchers"
                tempArticle.content = article.content.rendered

                //WRITE TO NEWS DIR
                fs.writeFileSync(`content/news-test/${tempArticle.slug}`, JSON.stringify(tempArticle))
            })

        });
    })

}
