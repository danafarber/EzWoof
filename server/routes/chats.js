const express = require("express");
const router = express.Router();
const Chat = require("../models/chats.js");
const mongoose = require("mongoose");

// get all chats
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find()
    .populate({
        path: "match",
        populate: {
          path: "user"
        },
      })
      .populate({
        path: "match",
        populate: {
          path: "trainer"
        },
      })
    .exec((err, chats) => {
      res.status(200).json(chats);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one chats
router.get("/:id", getChat, (req, res) => {
  res.json(res.chat);
});

// create chat
router.post("/", async (req, res) => {
  const chat = new Chat({
    match: mongoose.Types.ObjectId(req.body.match),
    messages: req.body.messages,
  });

  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete chat
router.delete("/:id", getChat, async (req, res) => {
  try {
    await res.chat.remove();
    res.json({ message: "Chat Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update chat
router.patch('/:id', getChat, async (req,res) => {

  if (req.body.messages != null) {
      res.chat.messages.push(req.body.messages)
  }

  try {
      const updatedChat = await res.chat.save()
      res.json(updatedChat)
  }

  catch(err) {
      res.status(400).json({message: err.message})
  }
});

// middlefunction
async function getChat(req, res, next) {
  let chat;

  try {
    chat = await Chat.findById(req.params.id)
    .populate({
      path: "match",
      populate: {
        path: "user"
      },
    })
    .populate({
      path: "match",
      populate: {
        path: "trainer"
      },
    })

    if (chat == null) {
      return res.status(404).json({ message: "Cannot find chat" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.chat = chat;
  next();
}

module.exports = router;
