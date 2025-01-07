const entries = require("../services/entries.service");

async function get(req, res, next) {
  try {
    res.json(await entries.getEntries());
  } catch (err) {
    console.error(`Error while getting entries`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await entries.createEntry(req.body));
  } catch (err) {
    console.error(`Error while saving entries`, err.message);
    next(err);
  }
}

module.exports = { get, create };
