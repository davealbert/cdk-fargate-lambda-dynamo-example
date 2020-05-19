const cdk = require('@aws-cdk/core');
const apigateway = require('../lib/lambda-apigateway-stack')


class FargateTestStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // Dynamo DB

    // Lambda && API Gateway
    new apigateway.LambdaService(this, 'FargateLambdaService')
    
    // Fargate
  }
}

module.exports = { FargateTestStack }
