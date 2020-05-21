const cdk = require('@aws-cdk/core')
const dynamodb = require("@aws-cdk/aws-dynamodb")

class DynamodbService extends cdk.Construct {
  constructor(scope, id, dynamoTableName) {
    super(scope, id)
    
    this.table = new dynamodb.Table(this, dynamoTableName, {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: dynamoTableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY // NOT FOR PRODUCTION
    })
  }

  grantReadWriteData(resource) {
    this.table.grantReadWriteData(resource)
  }
}

module.exports = { DynamodbService }