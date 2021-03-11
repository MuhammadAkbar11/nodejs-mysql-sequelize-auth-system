require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const PORT = process.env.PORT || 5050;

const sequelize = require("./database/database");

const sessiontStore = new MySQLStore({
  checkExpirationInterval: 900000,
  expiration: 86400000,
  insecureAuth: true,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
});

app.use(flash());

const expireDate = new Date();

expireDate.setDate(expireDate.getDate() + 2);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSIONDB_SECRET,
    store: sessiontStore,
    cookie: { expires: expireDate },
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

const authRoutes = require("./routes/auth");
const pageRoutes = require("./routes/pages");
const User = require("./models/user");
const Roles = require("./models/roles");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  const user = await User.findOne({
    where: { user_email: req.session.user.user_email },
  });

  if (!user) {
    return next();
  }
  req.user = user;
  next();
});

app.use("/auth", authRoutes);
app.use(pageRoutes);

Roles.hasMany(User);
User.belongsTo(Roles, {
  foreignKey: "user_roleId",
});

(async () => {
  await sequelize.sync();

  app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
})();
