#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { FargateTestStack } = require('../lib/fargate-test-stack');

const app = new cdk.App();
new FargateTestStack(app, 'FargateTestStack');
