var osmosis = require('osmosis');

var scrapeAmazonItem = function (url) {
  return new Promise((resolve, reject) => {
    let out = {}
    osmosis
      .get(url)
      .set({
        itemTitle: '#productTitle',
        price: '#priceblock_ourprice',
        itemImg: '#landingImage@data-old-hires'
      })
      .data(item => {
        out = item;
      })
      .done(() => {
        if (!out || !out.itemTitle || !out.price || !out.itemImg) {
          reject('Item Not found');
        }
        if (out.price) 
          out.price = Number.parseFloat(out.price.substring(1));
        out.link = url;
        resolve(out);
      })
      .error(reject);
  })
}

// debug code
// scrapeAmazonItem('https://www.amazon.com/gp/product/B073ZK95P6').then(console.log);

module.exports = scrapeAmazonItem;