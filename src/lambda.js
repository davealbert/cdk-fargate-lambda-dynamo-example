const AWS = require('aws-sdk')

exports.main = async function(event, context) {
  const method = event.httpMethod;
  let count = 0
  
  if (method === 'GET') {
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify({
        result: 'GET World',
        method: 'GET',
        count,
        date: new Date()
      })
    }
  }

  if (method === 'POST') {
    count++
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify({
        result: 'POST World',
        method: 'POST',
 
        date: new Date()
      })
    }
  }

  return {
    statusCode: 400,
    headers: {},
    body: "We only accept GET and POST not " + method
  }
}