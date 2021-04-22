const dev = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://hwq6djgm81.execute-api.us-east-1.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_GfGI334qW",
    APP_CLIENT_ID: "21a1lh05vi197scb9mknjlss6t",
    IDENTITY_POOL_ID: "us-east-1:9a93e85e-683d-4b64-9bfa-86b2c1dd4e5c",
  },
};
const prod = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://hwq6djgm81.execute-api.us-east-1.amazonaws.com/dev",
  },
};
const config = {
  // Default to dev if not set
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};
export default config;
