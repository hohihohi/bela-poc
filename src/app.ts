import * as aws_cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { EnvParameter, managementParameter } from "./parameter";

// App
const app = new aws_cdk.App();
aws_cdk.Tags.of(app).add("App", "bela-poc");

// Extract deploy environment parameters from context
export function getEnvParams(ap: aws_cdk.App): EnvParameter[] {
  const ALL_PARAMS = [managementParameter];

  const env_arg: string[] = ap.node.tryGetContext("env_names")
    ? String(ap.node.tryGetContext("env_names")).split(",")
    : [];
  const envNames = env_arg.length > 0 ? env_arg : [managementParameter.envName];
  const envParams = ALL_PARAMS.filter((param) =>
    envNames.includes(param.envName),
  );
  if (envParams.length <= 0) {
    throw new RangeError(
      "No environment parameters are found. Please confirm env_names",
    );
  }
  return envParams;
}

// Stack
export class MyStack extends aws_cdk.Stack {
  constructor(scope: Construct, id: string, props: aws_cdk.StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

const envParams = getEnvParams(app);
const mystack = new MyStack(app, "bela-poc-dev", ...envParams);
aws_cdk.Tags.of(mystack).add("Stack", "bela-poc-dev");

// NOTE: It's not necessary to call `app.synth()` here because our all Construct don't have "synthesize" method
// app.synth();
