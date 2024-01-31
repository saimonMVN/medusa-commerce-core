import { Configuration, FrontendApi } from "@ory/client";

const basePath = process.env.REACT_APP_ORY_URL
const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: {
      withCredentials: true,
    },
  }),
)

export default ory
