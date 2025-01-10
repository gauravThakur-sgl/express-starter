import EntryModel from '../models/entries.model'
export async function createEntry(entry:any) {
  const newEntry = new EntryModel(entry);
  await newEntry.save();
  return newEntry.toJSON();
}

export async function getEntries() {
  return EntryModel.find();
}

// export default { createEntry, getEntries };
