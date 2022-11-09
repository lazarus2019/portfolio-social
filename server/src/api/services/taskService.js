const Section = require("../models/sectionModel");
const Task = require("../models/taskModel");

const create = async (sectionId) => {
  if (!sectionId) throw new Error("sectionId is required || create");

  const section = await Section.findById(sectionId);
  if (!section) throw new Error("Section of this task not found || create");

  const tasksCount = await Task.find({ section: sectionId }).count();
  const task = await Task.create({
    section: sectionId,
    position: tasksCount > 0 ? tasksCount : 0,
  });

  task.section = section;

  return task;
};

const update = async (taskId, content) => {
  if (!taskId || !content)
    throw new Error("taskId and content is required || update");

  const task = await Task.findByIdAndUpdate(
    taskId,
    { $set: content },
    { new: true }
  );

  return task;
};

const deleteTask = async (taskId) => {
  if (!taskId) throw new Error("taskId is required || deleteTask");

  const currentTask = await Task.findById(taskId);
  await Task.deleteOne({ _id: taskId });

  const tasks = await Task.find({ section: currentTask.section }).sort({
    position: 1,
  });

  if (tasks?.length > 0) {
    for (const key in tasks) {
      await Task.findByIdAndUpdate(taskId, { $set: { position: key } });
    }
  }
};

const updatePosition = async (
  resourceList,
  destinationList,
  resourceSectionId,
  destinationSectionId
) => {
  if (
    !resourceList ||
    !destinationList ||
    !resourceSectionId ||
    !destinationSectionId
  )
    throw new Error(
      "resourceList, destinationList, resourceSectionId and destinationSectionId is required || updatePosition"
    );

  const resourceListReverse = resourceList?.reverse();
  const destinationListReverse = destinationList?.reverse();

  if (resourceSectionId !== destinationSectionId) {
    for (const key in resourceListReverse) {
      await Task.findByIdAndUpdate(resourceListReverse[key].id, {
        $set: { section: resourceSectionId, position: key },
      });
    }

    for (const key in destinationListReverse) {
      await Task.findByIdAndUpdate(destinationListReverse[key].id, {
        $set: { section: destinationSectionId, position: key },
      });
    }
  }
};

module.exports = {
  create,
  update,
  deleteTask,
  updatePosition,
};
