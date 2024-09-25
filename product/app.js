const { ddbClient } = require("./libs/ddbClient");
const { addProductToDb } = require("./src/product.service");

exports.productLambdaHandler = async (event) => {
  switch (true) {
    case event.httpMethod === "POST":
      return addProduct(JSON.parse(event.body));
    default:
      return buildResponse(400, { error: "Invalid resource access" });
  }
};

const addProduct = async (data) => {
  const params = {
    TableName:
      "producttable-" + (process.env.ENVIRONMENT_NAME || "ng") + "-dev",
    Item: {
      ProductID: { S: data.productId },
      ProductName: { S: data.productName },
      Price: { N: data.price },
      Category: { S: data.category },
      Inventory: { N: data.inventory },
    },
  };

  try {
    data = await addProductToDb(params);
    return buildResponse(200, { message: "Product successfully added" });
  } catch (err) {
    console.error(err);
    return buildResponse(500, { error: "Some internal error occured" });
  }
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
