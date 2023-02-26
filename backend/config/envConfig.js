import 'dotenv/config';

export default {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_KEY: process.env.STRIPE_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  ENDPOINT_SECRET: process.env.ENDPOINT_SECRET,
};
