const expressAsyncHandler = require("express-async-handler");
const validateMongoDbID = require("../utils/validateMongoDbID");
const {
  createProject,
  updateProject,
  isOwnerProject,
  getProjectBySlug,
  getProjectById,
  savingProject,
  removeSavingProject,
  getSavedProject,
  hideProject,
  getOwnProject,
  getProjectByUsername,
  uploadPreviewVideo,
  getAllProject,
  changeThumbnail,
} = require("../services/projectService");

//// Create
const projectCreateCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { title, shortDescription, content } = req?.body;

  try {
    await createProject(_id, req.file, { title, shortDescription, content });

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Change thumbnail
const projectUpdateThumbnailCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { projectId, oldThumbnailUrl } = req?.body;
  validateMongoDbID(projectId);

  try {
    await isOwnerProject(_id, projectId);

    await changeThumbnail(projectId, req?.file, oldThumbnailUrl);

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

//// Get project by id
const projectGetByIdCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { projectId } = req?.params;
  validateMongoDbID(projectId);

  try {
    await isOwnerProject(_id, projectId);
    const project = await getProjectById(projectId);
    res.status(200).json({ result: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get Own project
const projectGetOwnCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { page = 1, sort = "date", type, q } = req?.query;
  try {
    const result = await getOwnProject(_id, page, sort, type, q);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get project by username
const projectGetByUsernameCtrl = expressAsyncHandler(async (req, res) => {
  const { username } = req?.params;
  const { page = 1, sort = "date", q } = req?.query;
  try {
    const result = await getProjectByUsername(username, page, sort, q);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Delete
const projectDeleteCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { projectId } = req?.body;
  validateMongoDbID(projectId);

  try {
    await isOwnerProject(_id, projectId);
    //// Delete project here
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Update
const projectUpdateCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { projectId, content, shortDescription, title } = req?.body;
  validateMongoDbID(projectId);

  try {
    await isOwnerProject(_id, projectId);

    await updateProject(projectId, content, shortDescription, title);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Add & remove saved projects
const projectAddToSaveCtrl = expressAsyncHandler(async (req, res) => {
  const { _id, info } = req?.user;
  const { projectId } = req?.body;
  validateMongoDbID(projectId);

  try {
    const alreadySaved = info?.savedProject?.find(
      (project) => project.toString() === projectId.toString()
    );
    let savedProject = [];

    if (alreadySaved) {
      savedProject = await removeSavingProject(_id, projectId);
    } else {
      savedProject = await savingProject(_id, projectId);
    }

    res.status(200).json({ status: true, savedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get saved project (skip hide project)
const projectGetSavedCtrl = expressAsyncHandler(async (req, res) => {
  const { info } = req?.user;
  try {
    const projectList = await getSavedProject(info?.savedProject);

    res.status(200).json({ result: projectList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Hide Project
const projectHideCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { projectId } = req?.body;
  validateMongoDbID(projectId);

  try {
    await isOwnerProject(_id, projectId);
    await hideProject(projectId);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Upload preview video
const projectPreviewVideoUploadCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { projectId, oldPreviewVideoUrl } = req?.body;
  validateMongoDbID(projectId);

  try {
    await isOwnerProject(_id, projectId);

    // Remove the old video - ERROR
    await uploadPreviewVideo(projectId, req?.file, oldPreviewVideoUrl);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// [AD] Get all projects
const projectGetAllCtrl = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    const projectList = await getAllProject(page);

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
  projectAddToSaveCtrl,
  projectGetSavedCtrl,
  projectHideCtrl,
  projectPreviewVideoUploadCtrl,
  projectGetAllCtrl,
  projectUpdateThumbnailCtrl,
  projectDeleteCtrl,
  projectUpdateCtrl,
  projectGetByIdCtrl,
};
