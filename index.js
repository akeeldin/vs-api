'use strict';
var fs = require('fs');    //local filesystem

exports.get = function(event, context) {
	var contents = fs.readFileSync("public/index.html");

	var empid = event.params.querystring.empid;

	context.succeed({
		statusCode: 200,
		body: "employee id : "+empid,
		headers: {'Content-Type': 'text/html'}
	});
};

