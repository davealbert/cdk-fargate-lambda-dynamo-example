const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = process.env.TABLE_NAME || ''
const crypto = require('crypto')

exports.main = async function(event, context) {
  const method = event.httpMethod;
  let count = 0

  if (method === 'GET') {
    try {
      const params = {
        TableName: TABLE_NAME
      }
      const response = await db.scan(params).promise();
      return { statusCode: 200, body: JSON.stringify(response.Items) };
    } catch (dbError) {
      return { statusCode: 500, body: JSON.stringify(dbError)};
    }
  }

  if (method === 'POST') {
    try {
      const id = `${new Date()}-${crypto.randomBytes(20).toString('hex')}`
      const params = {
        TableName: TABLE_NAME,
        Item: { id }
      }
      params.result = await db.put(params).promise();
      return { statusCode: 200, body: JSON.stringify(params)};
    } catch (dbError) {
      console.log(dbError)
      return { statusCode: 500, body: JSON.stringify(dbError)};
    }
  }

  return {
    statusCode: 400,
    headers: {},
    body: "We only accept GET and POST not " + method
  }
}