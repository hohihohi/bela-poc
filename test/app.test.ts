import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { getEnvParams, MyStack } from "../src/app";
import { managementParameter } from "../src/parameter";

// UNIT TEST
describe("getEnvParams", () => {
  it("should return environment parameters when no parameter are specified", () => {
    // arrange
    const app = new App();
    const expected = [managementParameter];
    // act
    const envParams = getEnvParams(app);
    // assert
    expect(envParams).toHaveLength(1);
    expect(envParams[0]).toEqual(expected[0]);
  });
  it("should return environment parameters when valid arguments are specified", () => {
    // arrange
    // NOTE: https://github.com/aws/aws-cdk/issues/5149
    const app = new App({ context: { env_names: "Management" } });
    const expected = [managementParameter];
    // act
    const envParams = getEnvParams(app);
    // assert
    expect(envParams).toHaveLength(1);
    expect(envParams[0]).toEqual(expected[0]);
  });
  it("should throw error when no environment parameters are found", () => {
    // arrange
    // NOTE: https://github.com/aws/aws-cdk/issues/5149
    const app = new App({ context: { env_names: "Dev" } });
    // act & assert
    expect(() => getEnvParams(app)).toThrowError(
      new RangeError(
        "No environment parameters are found. Please confirm env_names",
      ),
    );
  });
});

// SNAPSHOT TEST
test("Snapshot", () => {
  const app = new App();
  const stack = new MyStack(app, "test");

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
