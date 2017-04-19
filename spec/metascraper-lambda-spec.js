var underTest = require('../app.js');

describe('Test opengraph for url', function () {

	var lambdaContextSpy;

	beforeEach(function () {
		lambdaContextSpy = jasmine.createSpyObj('lambdaContext', ['done']);
	});

	it('returns a valid object given a valid url', function (done) {
		var url = "http://github.com/samholmes/node-open-graph/raw/master/test.html";
		var expectedBody = '{"author":null,"date":null,"description":"This is a test bed for Open Graph protocol.","image":"http://google.com/images/logo.gif","publisher":"irrelavent","title":"OG Testing","url":"http://github.com/samholmes/node-open-graph/raw/master/test.html"}';
		underTest.proxyRouter({
			requestContext: {
				resourcePath: '/metascraper',
				httpMethod: 'POST'
			},
			queryStringParameters: {
				'url': 'http://github.com/samholmes/node-open-graph/raw/master/test.html'
			}
		}, lambdaContextSpy).then(function () {
			expect(lambdaContextSpy.done).toHaveBeenCalledWith(null, jasmine.objectContaining({body: expectedBody}));
		}).then(done, done.fail);
	});

	it('returns a valid object given an address without protocol', function (done) {
		var url = "github.com/samholmes/node-open-graph/raw/master/test.html";
		var expectedBody = '{"author":null,"date":null,"description":"This is a test bed for Open Graph protocol.","image":"http://google.com/images/logo.gif","publisher":"irrelavent","title":"OG Testing","url":"http://github.com/samholmes/node-open-graph/raw/master/test.html"}';
		underTest.proxyRouter({
			requestContext: {
				resourcePath: '/metascraper',
				httpMethod: 'POST'
			},
			queryStringParameters: {
				'url': 'http://github.com/samholmes/node-open-graph/raw/master/test.html'
			}
		}, lambdaContextSpy).then(function () {
			expect(lambdaContextSpy.done).toHaveBeenCalledWith(null, jasmine.objectContaining({body: expectedBody}));
		}).then(done, done.fail);
	});

	it('fails when run without a url', function (done) {
		var expectedBody = '{"errorMessage":"Invalid request. url parameter missing"}';
		underTest.proxyRouter({
			requestContext: {
				resourcePath: '/metascraper',
				httpMethod: 'POST'
			}
		}, lambdaContextSpy).then(function () {
			expect(lambdaContextSpy.done).toHaveBeenCalledWith(null, jasmine.objectContaining({body: expectedBody}));
		}).then(done, done.fail);
	});

	it('fails when run with an invalid url', function (done) {
		var url = "http://github.com/samholmes/node-open-graph/raw/master/test.html";
		underTest.proxyRouter({
			requestContext: {
				resourcePath: '/metascraper',
				httpMethod: 'POST'
			},
			queryStringParameters: {
				'url': 'nomnom://example................cooom'

			}
		}, lambdaContextSpy).then(function () {
			expect(lambdaContextSpy.done).toHaveBeenCalledWith(null, jasmine.objectContaining({statusCode: 500}));
		}).then(done, done.fail);
	});
});
