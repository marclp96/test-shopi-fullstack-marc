import { model, Schema } from "mongoose";

const settingsSchema = new Schema(
  {
    type: String,
  },
  { strict: false }
);

export const Settings = model("settings", settingsSchema);
