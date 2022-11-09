const expressAsyncHandler = require("express-async-handler");
const { checkUserOwnBoardById } = require("../services/boardService");
const { create, update, deleteSection } = require("../services/sectionService");
const validateMongoDbID = require("../utils/validateMongoDbID");

const sectionCreateCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { boardId } = req?.body;
  validateMongoDbID(boardId);

  try {
    await checkUserOwnBoardById(_id, boardId);
    const section = await create(boardId);

    res.status(200).json({ status: true, results: section });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const sectionUpdateCtrl = expressAsyncHandler(async (req, res) => {
  const { sectionId } = req?.params;
  validateMongoDbID(sectionId);
  const { title, icon } = req?.body;

  try {
    const section = await update(sectionId, { title, icon });

    res.status(200).json({ status: true, results: section });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const sectionDeleteCtrl = expressAsyncHandler(async (req, res) => {
  const { sectionId } = req?.params;
  validateMongoDbID(sectionId);

  try {
    await deleteSection(sectionId);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const sectionUpdatePositionCtrl = expressAsyncHandler(async (req, res) => {
  const { sections } = req?.body;

  try {
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  sectionCreateCtrl,
  sectionUpdateCtrl,
  sectionDeleteCtrl,
  sectionUpdatePositionCtrl,
};
