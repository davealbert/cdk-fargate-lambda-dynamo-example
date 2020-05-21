const cdk = require('@aws-cdk/core')
const apigateway = require('../lib/lambda-apigateway')
const dynamodb = require('../lib/dynamodb')
const dynamoTableName = 'fargate-table'
const fargate = require('../lib/fargate.js')

class FargateTestStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props)

    // Lambda && API Gateway
    const lambda = new apigateway.LambdaService(this, 'FargateLambdaService', dynamoTableName)

    // Dynamo DB
    const db = new dynamodb.DynamodbService(this, 'FargateDynamodbService', dynamoTableName)
    db.grantReadWriteData(lambda.handler)

    // Fargate
    new fargate.FargateService(this, 'FargateService')

  }
}

module.exports = { FargateTestStack }