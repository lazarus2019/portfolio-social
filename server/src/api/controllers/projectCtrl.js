const expressAsyncHandler = require("express-async-handler");
const {
  createProject,
  getProjectBySlug,
  getOwnProject,
  getProjectByUsername,
} = require("../services/projectService");

//// Create
const projectCreateCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { title, shortDescription } = req?.body;

  try {
    await createProject(_id, req.file, { title, shortDescription });

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get single project by slug
const projectGetBySlugCtrl = expressAsyncHandler(async (req, res) => {
  const { slug } = req?.params;
  try {
    const project = await getProjectBySlug(slug);

    res.status(200).json({ result: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get Own project
const projectGetOwnCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  try {
    const projectList = await getOwnProject(_id);

    res.status(200).json({ result: projectList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get project by username
const projectGetByUsernameCtrl = expressAsyncHandler(async (req, res) => {
  const { username } = req?.params;
  try {
    const projectList = await getProjectByUsername(username);

    res.status(200).json({ result: projectList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  projectCreateCtrl,
  projectGetBySlugCtrl,
  projectGetOwnCtrl,
  projectGetByUsernameCtrl,
};
