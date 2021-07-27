const path = require('path')
const fs = require('fs')
const download = require('image-downloader')

//joining path of directory
const directoryPath = path.join(__dirname, '/content/news')

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {

    if (err) {
        return console.log('Unable to scan directory: ' + err)
    }

    files.forEach(function (file) {
        //console.log(file);
        let fileContent = fs.readFileSync(`${__dirname}/content/news/${file}`, 'utf8')
        let jsonContent = JSON.parse(fileContent);
        if(jsonContent.image && jsonContent.image.src !== undefined) {
            const options = {
                url: jsonContent.imageLocationOld,
                dest: `${__dirname}/test-images`                // will be saved to /path/to/dest/image.jpg
            }

            download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
            })
            .catch((err) => console.error(err))

        }

    })
})