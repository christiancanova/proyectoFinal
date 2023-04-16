const configServer = () => {
    let BASE_URL;
    let URL_LOCAL = `${process.env.SERVER_URL_DEV}:${process.env.PORT}`;
    if (process.env.SERVER_MODE === "dev") {
      BASE_URL = URL_LOCAL;
      return BASE_URL;
    }
    if (process.env.SERVER_MODE === "prod") {
      BASE_URL = process.env.SERVER_URL_PROD;
      return BASE_URL;
    }
  };
  
  export default configServer;