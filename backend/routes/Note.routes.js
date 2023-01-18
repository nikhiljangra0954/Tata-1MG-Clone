const express = require("express");
const { Notemodel } = require("../models/Note.model.js");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  const query = req.query;
  const userID_making_req = req.body.userID;
  try {
    const notes = await Notemodel.find({ userID: userID_making_req });
    res.send(notes);
    // console.log(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new Notemodel(payload);
    await new_note.save();
    res.send("Note created");
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went Wrong" });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  console.log(id);
  const note = await Notemodel.findOne({ _id: id });
  console.log(note);
  const userID_in_note = note.userID;
  console.log(userID_in_note);
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized " });
    } else {
      await Notemodel.findByIdAndUpdate({ _id: id }, payload);
      res.send(`Note is updated of id ${id}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went Wrong" });
  }
});

noteRouter.put("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  console.log(id);
  const note = await Notemodel.findOne({ _id: id });
  console.log(note);
  const userID_in_note = note.userID;
  console.log(userID_in_note);
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized " });
    } else {
      await Notemodel.findByIdAndUpdate({ _id: id }, payload);
      res.send(`Note is updated of id ${id}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went Wrong" });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const note = await Notemodel.findOne({ _id: id });
  // console.log(note);
  const userID_in_note = note.userID;
  // console.log(userID_in_note);
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized " });
    } else {
      await Notemodel.findByIdAndDelete({ _id: id });
      res.send(`Note is deleted of id ${id}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went Wrong" });
  }
});

module.exports = {
  noteRouter,
};

//63c0327b64c09e9b95d6183e
