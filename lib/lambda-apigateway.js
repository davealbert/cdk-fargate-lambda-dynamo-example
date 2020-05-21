const cdk = require('@aws-cdk/core')
const apigateway = require("@aws-cdk/aws-apigateway")
const lambda = require("@aws-cdk/aws-lambda")

class LambdaService extends cdk.Construct {
  constructor(scope, id, dynamoTableName) {
    super(scope, id)
    
    this.handler = new lambda.Function(this, "FargateLambdaHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("src"),
      handler: "lambda.main",
      environment: {
        TABLE_NAME: dynamoTableName,
      }
    })
    
    const api = new apigateway.RestApi(this, "fargate-lambda-api", {
      restApiName: "Fargate Lambda Service",
      description: "This service serves a count."
    })
    
    const getFLIntegration = new apigateway.LambdaIntegration(this.handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    })
    
    api.root.addMethod("GET", getFLIntegration)
    api.root.addMethod("POST", getFLIntegration)
    api.root.addMethod("PUT", getFLIntegration)
    
    
    /*  Register additional resources
    const endpoint = api.root.addResource("{id}")
    
    const postWidgetIntegration = new apigateway.LambdaIntegration(this.handler)
    const getWidgetIntegration = new apigateway.LambdaIntegration(this.handler)
    
    endpoint.addMethod("POST", postWidgetIntegration)
    endpoint.addMethod("GET", getWidgetIntegration)
    */
  }
}

module.exports = { LambdaService }