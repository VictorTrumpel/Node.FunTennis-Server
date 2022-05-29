require("dotenv").config();

export const corsOptions = {
  origin: process.env["CLIENT_URL"],
};
