const assert = require('assert');
const nock = require('nock');
const Builton = require('../../src/main.js');

const endpoint = 'https://example.com';
const bearerToken = 'SERVICE_ACCOUNT_KEY';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const productsFile = require('../fetchmock/products.json');
const productFile = require('../fetchmock/product.json');

describe('Product related tests', () => {
  it('Should return a list of Products', (done) => {
    nock(endpoint)
      .get('/products')
      .query({ size: 100, page: 0 })
      .reply(200, productsFile);
    sa.products.get({}, (err, products) => {
      assert.ok(Array.isArray(products.current));
      assert.ok(products.current[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should return a product', (done) => {
    nock(endpoint)
      .get('/products/:productId:')
      .reply(200, productFile);
    sa.products.set(':productId:').get({}, (err, product) => {
      assert.ok((product.name === 'Test Product'));
      assert.ok(product.constructor.name === 'Product');
      done();
    });
  });
  it('Should search products', (done) => {
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products/search')
      .query({ size, page, query: 'searchQuery' })
      .reply(200, productsFile);
    sa.products.search('searchQuery', { page, size }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should gets products with a tag in array', (done) => {
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products')
      .query({ size, page, tags: 'searchTag' })
      .reply(200, productsFile);
    sa.products.get({ page, size, tags: ['searchTag'] }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should gets products with a tag in string', (done) => {
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products')
      .query({ size, page, tags: 'searchTag' })
      .reply(200, productsFile);
    sa.products.get({ page, size, tags: 'searchTag' }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should search products with tags as an array', (done) => {
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products/search')
      .query({
        query: 'query', size, page, tags: 'searchTag1,searchTag2',
      })
      .reply(200, productsFile);
    sa.products.search('query', { page, size, tags: ['searchTag1', 'searchTag2'] }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should search subproducts for a product', (done) => {
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products/:id:/sub_products/search')
      .query({ size, page, query: 'searchQuery' })
      .reply(200, productsFile);
    sa.products.searchSubProducts(':id:', 'searchQuery', { page, size }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
      done();
    });
  });
  it('Should search subproducts', async () => {
    const [page, size] = [2, 100];
    nock(endpoint)
      .get('/products/:id:/sub_products/search')
      .query({ size, page, query: 'searchQuery' })
      .reply(200, productsFile);
    return sa.products.searchSubProducts(':id:', 'searchQuery', { page, size }, (err, productPage) => {
      assert.ok(Array.isArray(productPage.current));
      assert.ok(productPage.current[0].constructor.name === 'Product');
    });
  });
});
