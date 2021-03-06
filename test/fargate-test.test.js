const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const FargateTest = require('../lib/fargate-test-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new FargateTest.FargateTestStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
