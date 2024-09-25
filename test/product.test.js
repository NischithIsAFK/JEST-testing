const app = require("./../product/app.js");

var event, context;

// telling jest to mock functions in the product.service.js file

jest.mock("./../product/src/product.service.js");

describe(" product lambda function unit tests", () => {
  test("Add Product Functionality test", async () => {
    event = require("../events/add-product.json");
    // event.httpMethod="GET";
    const result = await app.productLambdaHandler(event, context);
    expect(typeof result).toBe("object");
    expect(result).toEqual({
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: '{"message":"Product successfully added"}',
    });
  });
});
