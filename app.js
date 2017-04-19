var ApiBuilder = require('claudia-api-builder'),
    Metascraper = require('metascraper'),
    api = new ApiBuilder();

module.exports = api;

api.post('/metascraper', function (request) {
	// Check if parameter is present at all
	if (!request.hasOwnProperty("queryString") || !request.queryString.hasOwnProperty("url")) {
		throw new Error("Invalid request. url parameter missing");
	}
	// Check if it's a somewhat valid URL
	var url = request.queryString.url;
	if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
		// Check if maybe only the http part is missing?
		url = "http://" + url;
		if (!/^(http|https):\/\/[^ "]+$/.test(url)) {
			throw new Error("Invalid request. url invalid or non-HTTP(S)");
		}
	}
	console.log("Processing request for URL", url);

	// Actually execute the function
    return Metascraper.scrapeUrl(url);
});
