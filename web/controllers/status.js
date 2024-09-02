import { shopify } from "../core/index.js";

const PRODUCTS_COUNT = `{
  productsCount {
    count
  }
}`;

export const statusController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @description Retrieve a summary of the integration status
   */
  async summary(req, res) {
    try {
      const {
        locals: {
          shopify: { session },
        },
      } = res;

      const client = new shopify.api.clients.Graphql({ session });

      const {
        data: {
          productsCount: { count: products },
        },
      } = await client.request(PRODUCTS_COUNT);

      res.status(200).json({ products });
    } catch (error) {
      console.log(error);

      res.status(400).send();
    }
  },
};
