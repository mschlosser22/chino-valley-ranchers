var https = require("https");
var fs = require('fs');

//for (let i = 0; i <= 3; i++ ) {

    //let page = i + 1
    let url = `https://www.chinovalleyranchers.com/wp-json/wp/v2/posts/?page=1&per_page=100&_embed`

    https.get(url, function(res){
        let body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            try {
                let wpResponse = JSON.parse(body);
            } catch(err) {
                console.log(err)
            }

            // EACH ARTICLE
            wpResponse.map((article, index) => {
                let tempArticle = {}
                //let mediaURL = `https://www.chinovalleyranchers.com/wp-json/wp/v2/media/${article.featured_media}`
                tempArticle.title = article.title.rendered
                tempArticle.slug = article.slug
                tempArticle.imageLocationOld = article._embedded['wp:featuredmedia']['0'].source_url

                tempArticle.image = {}
                //tempArticle.image.src =

                //IMAGE DOWNLOAD IF IMAGE EXISTS
                if(tempArticle.imageLocationOld) {
                    const lastSegment = tempArticle.imageLocationOld.split("/").pop();
                    tempArticle.image.src = `/images/${lastSegment}`
                    tempArticle.image.alt = article._embedded['wp:featuredmedia']['0'].alt_text

                }


                tempArticle.date = article.date
                tempArticle.author = "Chino Valley Ranchers"
                tempArticle.content = article.content.rendered

                //WRITE TO NEWS DIR
                fs.writeFileSync(`content/news-images/${tempArticle.slug}.json`, JSON.stringify(tempArticle))
            })

        });

    })

//}
