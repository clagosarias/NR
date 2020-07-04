'use strict'
const liveServer = require("live-server");

const simpleHTTPServerFetchUrl = "http://0.0.0.0:8000/public/assets/host-app-data.json";
const liveServerFetchurl = "http://127.0.0.1:8080/assets/host-app-data.json"

const params = {
	root: "./public/",
	open: true,
	ignore: 'styles',
};

liveServer.start(params);