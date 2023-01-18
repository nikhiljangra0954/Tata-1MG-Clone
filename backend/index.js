const express = require("express");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.routes.js");
const { noteRouter } = require("./routes/Note.routes.js");
const { authenticate } = require("./middlewares/authenticate.middleware.js");
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/data", async (req, res) => {
//   const token = req.headers.authorization;
//   jwt.verify(token, "masai", (err, decoded) => {
//     if (err) {
//       console.log(err);
//       res.send(`Invalid Token`);
//     } else {
//       // console.log(decoded);
//       res.send("Data...");
//     }
//   });
// });

// app.get("/contact", async (req, res) => {
//   res.send("Contact");
// });

app.get("/cart", async (req, res) => {
  const token = req.query.token;
  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      console.log(err);
      res.send(`Invalid Token`);
    } else {
      // console.log(decoded);
      res.send("Cart Page");
    }
  });
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connection Established");
  } catch (error) {
    console.log("Err: Connection in DB");
    console.log(error);
  }
  console.log("listening on port 8080");
});


// {
//   "title":"Frontend",
//   "note":"Crud PSC",
//   "catagory":"Live Session",
//   "author":"Sitansu"
// }


