#metascraper-lambda

This project is a small API to resolve meta information from a website that is meant to be deployed to AWS Lambda + API Gateway.

It is powered by [ClaudiaJS CLI](https://claudiajs.com/) and [API Builder](https://claudiajs.com/claudia-api-builder.html) and [ianstormtaylor's metascraper](https://github.com/ianstormtaylor/metascraper) library for NodeJS. Shouts out to both projects!

##Why?

The project was created because we had problems getting to run freely available metadata scraper APIs. Both opengraph.io and linkpreview.net had problems with their CORS settings, making it effectively impossible to run them from browser-side Javascript.

It is meant to be deployed and forgotten, although beware, that in its current version, there is no access control. You may want to secure your installation with [custom CORS settings](https://github.com/claudiajs/claudia-api-builder/blob/master/docs/api.md#controlling-cross-origin-resource-sharing-headers) and/or an [API key](https://github.com/claudiajs/claudia-api-builder/blob/master/docs/api.md#requiring-api-keys)

##Dependencies

All command line tools require `NodeJS` and `npm`. I tested it with NodeJS v6 LTS and npm v3.10.10.

For deployment, you need the package `claudia`:

`npm install -g claudia`

For development, you also need to install all dependencies:

`npm install`

For testing, you need the `jasmine` CLI:

`npm install -g jasmine`

##First deployment

The deployment is done using the ClaudiaJS CLI. I created an npm run script for that purpose. So you can either run that (`npm run deploy`) or, if you want to [set a bit more options](https://github.com/claudiajs/claudia/blob/master/docs/create.md), run `claudia create --region eu-central-1 --api-module api` with your custom options.

Notice that in either case, you need to have your [AWS credentials configured](https://claudiajs.com/tutorials/installing.html).

After the deployment, ClaudiaJS will output a URL similar to this:

`https://something.execute-api.eu-central-1.amazonaws.com/latest`

You can then use your newly created API by appending `/metascraper?url=https://google.com` and `POST`ing the request (where `https://google.com` is the address you want to scrape the metadata for)

###CURL:

`curl -X POST https://something.execute-api.eu-central-1.amazonaws.com/latest/metascraper?url=https://github.com`

###jQuery:

See the full example in this [Codepen](https://codepen.io/anon/pen/aWvgeQ).

<pre>
var url = "https://github.com";
$.post("https://something.execute-api.eu-central-1.amazonaws.com/latest/metascraper?url=" + url, function(data, status){
    alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);
});</pre>

You may need to URLencode the URL you want to test.

##Redeploy

If you modify some stuff in the `app.js` or update this package, you may want to redeploy by running either 

`npm run update` or

`claudia update`

##Test

There is a minimal set of test cases included in this project's `spec` directory. The test runner is `jasmine`, which is also the command used to run the tests. Useful documentation for testing ClaudiaJS API Builder apps can be found [here](https://claudiajs.com/tutorials/testing-locally.html).

##Other stuff

Since this package is pretty minimal, but ClaudiaJS actually supports a LOT of customization options, you can just go to their site and look up [how to do more stuff](https://github.com/claudiajs/claudia-api-builder/blob/master/docs/api.md).

