const expressAsyncHandler = require("express-async-handler");
const {
  create,
  update,
  deleteTask,
  updatePosition,
} = require("../services/taskService");
const validateMongoDbID = require("../utils/validateMongoDbID");

const taskCreateCtrl = expressAsyncHandler(async (req, res) => {
  const { sectionId } = req?.body;
  validateMongoDbID(sectionId);

  try {
    const task = await create(sectionId);

    res.status(200).json({ status: true, results: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const taskUpdateCtrl = expressAsyncHandler(async (req, res) => {
  const { taskId } = req?.params;
  validateMongoDbID(taskId);
  const { title, icon, content, isDone } = req?.body;

  try {
    const task = await update(taskId, { title, icon, content, isDone });

    res.status(200).json({ status: true, results: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const taskUpdatePositionCtrl = expressAsyncHandler(async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
  } = req?.body;
  try {
    await updatePosition(
      resourceList,
      destinationList,
      resourceSectionId,
      destinationSectionId
    );

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const taskDeleteCtrl = expressAsyncHandler(async (req, res) => {
  const { taskId } = req?.params;
  validateMongoDbID(taskId);

  try {
    await deleteTask(taskId);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  taskCreateCtrl,
  taskUpdateCtrl,
  taskUpdatePositionCtrl,
  taskDeleteCtrl,
};
