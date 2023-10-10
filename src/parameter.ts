import { Environment } from "aws-cdk-lib";

export interface EnvParameter {
  env?: Environment;
  envName: string;
}

export const managementParameter: EnvParameter = {
  env: { region: "us-east-1" },
  envName: "Management",
};
