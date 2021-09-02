import dotenv from "dotenv";
import aws from "aws-sdk";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // hostname
  hostname: process.env.HOSTNAME,

  // port
  port: parseInt(process.env.PORT),

  // database
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  db: {
    host: process.env.DB_HOST,
    timezone: "+09:00",
    dialect: "mysql",
    logging: false,
  },

  // cookie
  secret: process.env.SECRET,

  // api
  api: { prefix: "/api" },

  // session
  sessionOption: {
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: { httpOnly: true, secure: false },
  },

  // mail
  mailOption: {
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  },

  // image upload
  s3: new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
  }),
};
