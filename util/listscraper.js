var osmosis = require('osmosis');

var scrapeAmazonList = function (url) {
  return new Promise((resolve, reject) => {
    let items = [];
    osmosis
    .get(url)
    .set({
      listTitle: '#list-header span#profile-list-name',
      listDescription: '#wlDesc',
    })
    .find('.g-item-sortable:gt(0)')
    .set({
      itemTitle: '.g-item-details .a-link-normal',
      link: '.g-item-details .a-link-normal@href',
      price: '.a-offscreen'
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
          link: 'http://amazon.com' + items[i].link,
          price: parseFloat(items[i].price.substring(1))
        })
      }

      resolve(ret);
    })
    .error(reject);
  })
}

module.exports = scrapeAmazonList;