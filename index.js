const express = require('express');
const rp = require('request-promise');
const $ = require('cheerio');
const download = require('image-downloader');

const app = express();

let digimon_name = 'greymon';

const url = `https://digimon.fandom.com/wiki/${digimon_name}`;

rp(url)
  .then(function(html){
    //success!
    const url = $('.image-thumbnail > img', html)[0].attribs["data-src"];
    
    const options = {
        url: url,
        dest: `/digimon/${digimon_name}.jpg`
    }
    
    download.image(options)
        .then(({ filename, image }) => {
            console.log(`File saved to ${filename}.`);
    })
    .catch((err) => {
        console.error(err);
    })
  })
  .catch(function(err){
    //handle error
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));