#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AuthStack } from "./lib/AuthStack";
import { IdentityStack } from "./lib/IdentityStack";
import { AmplifyHostingStack } from "./lib/NextJSHostingStack";

const app = new cdk.App();

const authStack = new AuthStack(app, "ProductAuthStack", {});

const identityStack = new IdentityStack(app, "ProductIdentityStack", {
  userpool: authStack.userpool,
  userpoolClient: authStack.userPoolClient,
});

const amplifyHostingStack = new AmplifyHostingStack(
  app,
  "ProductHostingStack",
  {

    //pass in any envVars from the above stacks here
    environmentVariables: {
      USERPOOL_ID: authStack.userpool.userPoolId,
    },
  }
);