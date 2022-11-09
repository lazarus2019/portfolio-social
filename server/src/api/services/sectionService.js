const Section = require("../models/sectionModel");
const Task = require("../models/taskModel");

const create = async (boardId) => {
  if (!boardId) throw new Error("boardId is required || create");

  const section = await Section.create({ board: boardId });
  section.tasks = [];

  return section;
};
const update = async (sectionId, content) => {
  if (!sectionId || !content)
    throw new Error("sectionId and is required || update");

  const section = await Section.findByIdAndUpdate(sectionId, {
    $set: content,
  });
  section.tasks = [];

  return section;
};
const deleteSection = async (sectionId) => {
  if (!sectionId) throw new Error("sectionId is required || deleteSection");

  await Task.deleteMany({ section: sectionId });
  await Section.deleteOne({ _id: sectionId });
};
module.exports = {
  create,
  update,
  deleteSection,
};
