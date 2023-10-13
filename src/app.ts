import * as aws_cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { managementParameter } from "./parameter";

// App
const app = new aws_cdk.App();
aws_cdk.Tags.of(app).add("App", "bela-poc");

// Extract deploy environment names from context
// const env_arg: string[] = `${app.node.tryGetContext("env_names")}`.split(",");
const env_arg: string[] = `${app.node.tryGetContext("env_names")}`.split(",");
const envNames = env_arg.length > 0 ? env_arg : [managementParameter.envName];
const allParams = [managementParameter];
const envParams = allParams.filter((param) => envNames.includes(param.envName));

// Stack
export class MyStack extends aws_cdk.Stack {
  constructor(scope: Construct, id: string, props: aws_cdk.StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}
const mystack = new MyStack(app, "bela-poc-dev", ...envParams);
aws_cdk.Tags.of(mystack).add("Stack", "bela-poc-dev");

// NOTE: It's not necessary to call `app.synth()` here because our all Construct don't have "synthesize" method
// app.synth();
