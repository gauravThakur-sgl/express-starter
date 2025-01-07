const EntryModel = require("../models/entries.model");

async function createEntry(entry) {
  const newEntry = new EntryModel(entry);
  await newEntry.save();
  return newEntry.toJSON();
}

async function getEntries() {
  return EntryModel.find();
}

module.exports = { createEntry, getEntries };
