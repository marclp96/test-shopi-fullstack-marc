import { shopify } from "../core/index.js";

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

      const { count: products } = await shopify.api.rest.Product.count({
        session,
      });

      res.status(200).json({ products });
    } catch (error) {
      console.log(error);

      res.status(400).send();
    }
  },
};
