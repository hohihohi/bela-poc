import * as aws_cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class MyStack extends aws_cdk.Stack {
  constructor(scope: Construct, id: string, props: aws_cdk.StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new aws_cdk.App();

new MyStack(app, "bela-poc-dev", { env: devEnv });
// new MyStack(app, 'bela-poc-prod', { env: prodEnv });

app.synth();
