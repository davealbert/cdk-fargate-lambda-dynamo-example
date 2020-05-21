const cdk = require('@aws-cdk/core')
const ec2 = require("@aws-cdk/aws-ec2")
const ecs = require("@aws-cdk/aws-ecs")
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns")

class FargateService extends cdk.Construct {
  constructor(scope, id) {
    super(scope, id)
    
    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 3 // Default is all AZs in region
    })
    
    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc
    })
    
    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster, // Required
      cpu: 256, // Default is 256
      desiredCount: 2, // Default is 1
      taskImageOptions: { 
        image: ecs.ContainerImage.fromRegistry("davealbert/simple-fastify-counter:latest"),
        containerPort: 3000,
        environment: {
          ENVVAR: '[20200521T090447] Variable is from CDK!'
        }
      },
      memoryLimitMiB: 512, // Default is 512
      publicLoadBalancer: true // Default is false
    })
  }
}

module.exports = { FargateService }