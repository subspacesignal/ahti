var http = require('http');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  getSubreddit(res);
});

function getSubreddit(browserResponse) {

  const subreddit = 'node';
  const options = {
    hostname: 'api.imgur.com',
    path: `/3/gallery/r/${subreddit}`,
    method: 'GET',
    headers: {
      'Authorization': 'Client-ID 6f84784b8884310'
    }
  };

  http.get(options, (res) => {
    const statusCode = res.statusCode;

    if (statusCode !== 200) {
      console.log(`Received HTTP ${statusCode} from imgur`);
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        let imgurResponse = JSON.parse(rawData);
        var hrefs = [];
        imgurResponse.data.forEach(function (image) {
          if (image.link.includes(".jpg") || image.link.includes(".gif") || image.link.includes(".png") || image.link.includes(".jpeg")) {
            hrefs.push({href: image.link});
          }
        });

        var result = {};
        result.hrefs = hrefs;
        browserResponse.json(result);
      } catch (e) {
        console.log(e.message);
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}

module.exports = router;
