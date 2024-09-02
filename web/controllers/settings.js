import { Settings } from "../models/index.js";

export const settingsController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @description Retrieve application settings, use url param ``type`` for knowing what kind of settings are being requested
   */
  async get(req, res) {
    try {
      // Determine what kind of settings are being requested
      const type = req.params.type;

      // Find settings on db
      const settings = await Settings.findOne({ type }).lean();

      res.status(200).json(settings);
    } catch (error) {
      console.log(error);

      res.status(400).send();
    }
  },

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @description Set application settings, use property ``type`` in body's payload to determine what kind of settings should be settled
   */
  async set(req, res) {
    try {
      const { body: settings } = req;

      // If there is a record for the settings with the indicated type then update it, otherwise will create a new record
      const settingsSaved = await Settings.findOneAndUpdate(
        { type: settings.type },
        settings,
        { upsert: true, new: true }
      ).lean();

      res.status(200).json(settingsSaved);
    } catch (error) {
      console.log(error);

      res.status(400).send();
    }
  },
};
