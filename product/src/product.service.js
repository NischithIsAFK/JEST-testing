const { ddbClient } = require('../libs/ddbClient');
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");

const addProductToDb = (params) => {
return ddbClient.send(new PutItemCommand(params));
}

module.exports = {addProductToDb};