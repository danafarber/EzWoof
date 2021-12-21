const express = require("express");
const router = express.Router();
const Match = require("../models/matches.js");
const mongoose = require("mongoose");

// get all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("user")
      .populate("trainer")
      .exec((err, matches) => {
        res.status(200).json(matches);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one match
router.get("/:id", getMatch, (req, res) => {
  res.json(res.match);
});

// Create match
router.post("/", async (req, res) => {
  const match = new Match({
    user: mongoose.Types.ObjectId(req.body.user),
    trainer: mongoose.Types.ObjectId(req.body.trainer),
  });

  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete match
router.delete("/:id", getMatch, async (req, res) => {
  try {
    await res.match.remove();
    res.json({ message: "Match Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middlefunction
async function getMatch(req, res, next) {
  let match;

  try {
    match = await Match.findById(req.params.id)
      .populate("user")
      .populate("trainer")

    if (match == null) {
      return res.status(404).json({ message: "Cannot find match" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.match = match;
  next();
}

module.exports = router;
