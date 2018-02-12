var chai = require('chai');
var expect = require('chai').expect;

var scrapeAmazonItem = require('../util/itemscraper');
var scrapeAmazonList = require('../util/listscraper');

process.on('unhandledRejection', e => {
	throw e;
});

/*
    Amazon Scraper Tests
*/
describe('amazon item scraper', () => {
	it('scrapes an amazon item', function () {
		this.timeout(10000);
		return scrapeAmazonItem('https://www.amazon.com/gp/product/B073ZK95P6').then(item => {
			expect(item).to.deep.equal({
				itemTitle: 'Cable Knit Beanie by Tough Headwear - Thick, Soft & Warm Chunky Beanie Hats for Women & Men - Serious Beanies for Serious Style',
				price: 9.95,
				itemImg: 'https://images-na.ssl-images-amazon.com/images/I/81tKDBM5TmL._SL1500_.jpg',
				link: 'https://www.amazon.com/gp/product/B073ZK95P6'
			});
		}).catch(err => {});
	})

	it('throws an error when the item is invalid', function () {
		scrapeAmazonItem('https://www.google.com').catch(err => {
			expect(err).to.exist;
		});
	})

	it('scrapes an amazon list', function () {
		this.timeout(10000);
		return scrapeAmazonList('https://www.amazon.com/hz/wishlist/ls/Y3JW1PSZPW9N?&sort=default').then(item => {
			expect(item).to.deep.equal({
				items: [{
						itemTitle: 'Seagate 2TB BarraCuda SATA 6Gb/s 128MB Cache 2.5-Inch 7mm Internal Hard Drive (ST2000LM015)',
						link: 'http://amazon.com/dp/B01LX13P71/_encoding=UTF8?coliid=I19MTVKSJ4H6L&colid=Y3JW1PSZPW9N&psc=1',
						price: 84.29
					},
					{
						itemTitle: 'Crucial 16GB Kit (8GBx2) DDR4 2400 MT/S (PC4-19200) SR x8 Unbuffered SODIMM 260-Pin Memory - CT2K8G4SFS824A',
						link: 'http://amazon.com/dp/B01BIWMWVS/_encoding=UTF8?coliid=I1CLHTOH1OQKFV&colid=Y3JW1PSZPW9N&psc=1',
						price: 174.25
					},
					{
						itemTitle: 'Sony Premium Noise Cancelling, Bluetooth Headphone, Black (MDR1000X/B)',
						link: 'http://amazon.com/dp/B01KHZ4ZYY/_encoding=UTF8?coliid=ILR69N7Q3W2HX&colid=Y3JW1PSZPW9N&psc=1',
						price: 348
					}
				],
				listTitle: 'Test Wish List',
				listDescription: 'WHOP WHOP ITS A LIST'
			});
		}).catch(err => {});
	})

	it('throws an error when the list is invalid', function (done) {
		scrapeAmazonList('https://www.google.com').then(() => { }).catch(err => {
			expect(err).to.exist;
			done();
		});

		it('throws an error when the url is empty (item scraping)', function (done) {
			scrapeAmazonItem('').catch(err => {
				expect(err).to.exist;
				done();
			});
		})
	})
})

describe('amazon list scraper', () => {
	it('scrapes an amazon list', function () {
		this.timeout(10000);
		return scrapeAmazonList('https://www.amazon.com/hz/wishlist/ls/Y3JW1PSZPW9N?&sort=default').then(item => {
			expect(item).to.deep.equal({
				items: [{
						itemTitle: 'Seagate 2TB BarraCuda SATA 6Gb/s 128MB Cache 2.5-Inch 7mm Internal Hard Drive (ST2000LM015)',
						link: 'http://amazon.com/dp/B01LX13P71/_encoding=UTF8?coliid=I19MTVKSJ4H6L&colid=Y3JW1PSZPW9N&psc=1',
						price: 84.29
					},
					{
						itemTitle: 'Crucial 16GB Kit (8GBx2) DDR4 2400 MT/S (PC4-19200) SR x8 Unbuffered SODIMM 260-Pin Memory - CT2K8G4SFS824A',
						link: 'http://amazon.com/dp/B01BIWMWVS/_encoding=UTF8?coliid=I1CLHTOH1OQKFV&colid=Y3JW1PSZPW9N&psc=1',
						price: 174.25
					},
					{
						itemTitle: 'Sony Premium Noise Cancelling, Bluetooth Headphone, Black (MDR1000X/B)',
						link: 'http://amazon.com/dp/B01KHZ4ZYY/_encoding=UTF8?coliid=ILR69N7Q3W2HX&colid=Y3JW1PSZPW9N&psc=1',
						price: 348
					}
				],
				listTitle: 'Test Wish List',
				listDescription: 'WHOP WHOP ITS A LIST'
			});
		}).catch(err => {});
	})

	it('throws an error when the list is invalid', function (done) {
		scrapeAmazonList('https://www.google.com').then(() => {}).catch(err => {
			expect(err).to.exist;
			done();
		});
	})

	it('throws an error when the url is empty (list scraping)', function (done) {
		scrapeAmazonList('').catch(err => {
			expect(err).to.exist;
			done();
		});
	})
})