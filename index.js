'use strict';
var fs = require('fs');    //local filesystem

// Load the SDK for JavaScript
var AWS = require('aws-sdk');

exports.get = function(event, context) {
	var contents = fs.readFileSync("public/index.html");
	let empid = 100;

    //Although only 'event.queryStringParameters' are used here, other request data, 
    //such as 'event.headers', 'event.pathParameters', 'event.body', 'event.stageVariables', 
    //and 'event.requestContext' can also be used. More at http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        if (event.queryStringParameters.empid !== undefined && 
            event.queryStringParameters.empid !== null && 
            event.queryStringParameters.empid !== "") {
            console.log("Received name: " + event.queryStringParameters.empid);
            empid = event.queryStringParameters.empid;
        }
    }


                // Create DynamoDB service object
                var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

                console.log("Querying for movies from Employee Db");

    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    var tableName = "employee";
    dynamodb.scan({
        TableName : tableName,
        Limit : 10
    }, function(err, data) {
        if (err) {
            context.done('error','reading dynamodb failed: '+err);
        }
        for (var i in data.Items) {
            i = data.Items[i];
            console.log(i.emp_id.S + ': '+ i.name.S);
            context.done(null, "Ciao!");
        }
    });

// //-----

//                 // AWS.config.update({
//                 //   region: "us-west-2",
//                 //   //endpoint: "http://localhost:8000"
//                 // });

//                 var docClient = new AWS.DynamoDB.DocumentClient()

//                 var table = "employee";

//                 var eid = 1;
//                 //var title = "The Big New Movie";

//                 var params = {
//                     TableName: table,
//                     Key:{
//                         "emp_id": eid
//                     }
//                 };

//                 docClient.get(params, function(err, data) {
//                     if (err) {
//                         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//                     } else {
//                         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//                     }
//                 });



// //     let id = event.pathParameters.product || false;
// //     switch(event.httpMethod) {

// //         case "GET":
// //             empid += " Its a GET id:"+id;

// //            if(id) {

// //                 // Create DynamoDB service object
// //                 var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// //                 console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");
// // //-----

//                 AWS.config.update({
//                   region: "us-west-2",
//                   //endpoint: "http://localhost:8000"
//                 });

//                 var docClient = new AWS.DynamoDB.DocumentClient()

//                 var table = "employee";

//                 var eid = 1;
//                 //var title = "The Big New Movie";

//                 var params = {
//                     TableName: table,
//                     Key:{
//                         "emp_id": eid
//                     }
//                 };

//                 docClient.get(params, function(err, data) {
//                     if (err) {
//                         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//                     } else {
//                         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//                     }
//                 });
// //-----

//                 // var params = {
//                 //     TableName : "employee",
//                 //     ProjectionExpression:"#eid, name, status",
//                 //     KeyConditionExpression: "#eid = 1",
//                 //     ExpressionAttributeNames:{
//                 //         "#eid": "emp_id"
//                 //     }
//                 //     // ExpressionAttributeValues: {
//                 //     //     ":eidval":1
//                 //     // }
//                 // };

//                 // console.log("About to run ddb query .  .  .");
//                 // ddb.query(params, function(err, data) {
//                 //   if (err) {
//                 //     console.log("Error", err);
//                 //   } else {
//                 //     console.log("DynamoDB query didn't");
//                 //     data.Items.forEach(function(element, index, array) {
//                 //         emp_name = element.name.S
//                 //         emp_status = element.status.S
//                 //       console.log(element.name.S + " (" + element.status.S + ")");
//                 //     });
//                 //   }
//                 // });




//             //callback(null, {body: "This is a READ operation on emp_id " + id + "name : " + name + " status : " + status});
//                 //return;  
//            } 

//         //     callback(null, {body: "This is a LIST operation, return all products"});
//         //     break;

//         // case "POST":            
//         //     callback(null, {body: "This is a CREATE operation"}); 
//         //     break;

//         // case "PUT": 
//         //     callback(null, {body: "This is an UPDATE operation on product ID " + id});
//         //     break;

//         // case "DELETE": 
//         //     callback(null, {body:"This is a DELETE operation on product ID " + id});
//         //     break;

//         // default:
//         //     // Send HTTP 501: Not Implemented
//         //     console.log("Error: unsupported HTTP method (" + event.httpMethod + ")");
//         //     callback(null, { statusCode: 501 })

//     }

    context.succeed({
     statusCode: 200,
     //body: contents.toString(),
     body: empid.toString(),
     headers: {'Content-Type': 'text/html'}
   });

};
