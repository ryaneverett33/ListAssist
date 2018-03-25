var osmosis = require('osmosis');

var scrapeAmazonList = function (url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject('Url not defined');
    }
    let items = [];
    osmosis
    .get(url)
    .set({
      listTitle: '#list-header span#profile-list-name',
      listDescription: '#wlDesc',
    })
    //.find('.g-item-sortable:gt(0)')
    //.find('.g-item-sortable:first(1000000)')
    .find('.g-item-sortable')
    //.find('#g-items')
    .set({
      itemTitle: '.g-item-details .a-link-normal',
      link: '.g-item-details .a-link-normal@href'
    })
    .data(item => items.push(item))
    .done(() => {
      var ret = {
        items: []
      }
      // pull out title and description elements
      if (items.length > 0) {
        ret.listTitle = items[0].listTitle;
        ret.listDescription = items[0].listDescription;
      }
      
      for (var i = 0; i < items.length; i++) {
        ret.items.push({
          itemTitle: items[i].itemTitle,
          link: 'http://amazon.com' + items[i].link
          // price: parseFloat(items[i].price.substring(1))
        })
      }

      resolve(ret);
    })
    .error(reject);
  })
}

// Debug code
// scrapeAmazonList('https://www.amazon.com/hz/wishlist/ls/Y3JW1PSZPW9N?&sort=default').then(console.log);

module.exports = scrapeAmazonList;