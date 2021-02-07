const express = require("express");
const cookieParser = require("cookie-parser");

const ServicesRouter = require("./routes/Services.routes");
const AuthRouter = require("./routes/Auth.routes");
const PublicRouter = require("./routes/Public.routes");
const EditorRouter = require("./routes/Editor.routes");
const AdminRouter = require("./routes/Admin.routes");
const SuperAdminRouter = require("./routes/SuperAdmin.routes");

const app = express();

app.set("port", process.env.PORT || 5000);

require("./database/mongoose");
require("./config/passportConfig");

app.use(express.static("uploads"));
app.use(express.static("build"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/services", ServicesRouter);
app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/editor", EditorRouter);
app.use("/admin", AdminRouter);
app.use("/superAdmin", SuperAdminRouter);

module.exports = app;
