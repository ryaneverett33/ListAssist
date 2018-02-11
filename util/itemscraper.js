var osmosis = require('osmosis');

var scrapeAmazonItem = function (url) {
  return new Promise((resolve, reject) => {
    let out = {}
    osmosis
      .get(url)
      .set({
        itemTitle: '#productTitle',
        price: '#priceblock_ourprice'
      })
      .data(item => {
        out = item;
      })
      .done(() => {
        out.price = Number.parseFloat(out.price.substring(1));
        out.link = url;
        resolve(out);
      })
      .error(reject);
  })
}

module.exports = scrapeAmazonItem;