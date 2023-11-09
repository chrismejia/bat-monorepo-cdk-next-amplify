#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AuthStack } from "../lib/AuthStack";
import { IdentityStack } from "../lib/IdentityStack";
import { AmplifyHostingStack } from "../lib/NextJSHostingStack";

const app = new cdk.App();

const authStack = new AuthStack(app, "BATAuthStack", {});

const identityStack = new IdentityStack(app, "BATProductIdentityStack", {
  userpool: authStack.userpool,
  userpoolClient: authStack.userPoolClient,
});

const amplifyHostingStack = new AmplifyHostingStack(
  app,
  "BATProductHostingStack",
  {
    // Name given to plaintext secret in secretsManager.
    // When creating the token scope on Github, only the admin:repo_hook scope is needed
    githubOauthTokenName: "bat-monorepo-cdk-next-amplify-pat",
    // swap for your github username
    owner: "chrismejia",
    // swap for your github frontend repo
    repository: "bat-monorepo-cdk-next-amplify/packages/frontend",
    //pass in any envVars from the above stacks here
    environmentVariables: {
      USERPOOL_ID: authStack.userpool.userPoolId,
      AMPLIFY_MONOREPO_APP_ROOT: "packages/frontend",
    },
  }
);
