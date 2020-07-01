var liveServer = require("live-server");

var params = {
	root: "./public/",
	open: true,
	ignore: 'styles',
};

liveServer.start(params);