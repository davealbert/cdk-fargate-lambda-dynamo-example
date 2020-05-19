const cdk = require('@aws-cdk/core');
const apigateway = require("@aws-cdk/aws-apigateway")
const lambda = require("@aws-cdk/aws-lambda")


class LambdaService extends cdk.Construct {
    constructor(scope, id) {
      super(scope, id)
    
        const handler = new lambda.Function(this, "FargateLambdaHandler", {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.asset("src"),
            handler: "lambda.main",
            environment: {
            // BUCKET: bucket.bucketName
            }
        })

        const api = new apigateway.RestApi(this, "fargate-lambda-api", {
            restApiName: "Fargate Lambda Service",
            description: "This service serves a count."
          })
      
          const getFLIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
          })
      
          api.root.addMethod("GET", getFLIntegration)
          api.root.addMethod("POST", getFLIntegration)

          const endpoint = api.root.addResource("{id}");
      
          const postWidgetIntegration = new apigateway.LambdaIntegration(handler);
          const getWidgetIntegration = new apigateway.LambdaIntegration(handler);
      
          endpoint.addMethod("POST", postWidgetIntegration); // POST /{id}
          endpoint.addMethod("GET", getWidgetIntegration); // GET /{id}
    }
}

module.exports = { LambdaService }