const Project = require("../models/projectModel");
const User = require("../models/userModel");
const {
  uploadPhotoToCloudinary,
  deleteCloudinaryPhotoById,
} = require("../utils/cloudinaryUploadPhoto");
const { getPublicId } = require("../utils/uploadFile");
const checkBadWords = require("../utils/badWords");
const {
  uploadVideoToCloudinary,
  deleteCloudinaryVideoById,
} = require("../utils/cloudinaryUploadVideo");
const slugify = require("../utils/slugify");
const {
  paginationFindQuery,
  paginationWithArrayIds,
} = require("../utils/paginationResult");
const { PROJECTS_PER_PAGE } = process.env;

const isOwnerProject = async (userId, projectId) => {
  if (!projectId || !userId)
    throw new Error("projectId or userId is required || isOwnerProject");

  const project = await Project.findById(projectId).select("user");
  if (!project) throw new Error("Project Not Found || isOwnerProject");

  if (project?.user.toString() === userId.toString()) return;

  throw new Error("You not own this project || isOwnerProject");
};

const createProject = async (userId, fileThumbnail, projectInfo) => {
  if (!projectInfo || !userId || !fileThumbnail)
    throw new Error(
      "projectInfo, userId or fileThumbnail is required || createProject"
    );

  const isProfane = checkBadWords(
    projectInfo.title,
    projectInfo.shortDescription,
    projectInfo.content
  );

  if (isProfane)
    throw new Error(
      "Content contains bad words, please remove it and try again || createProject"
    );

  const imgUploaded = await uploadPhotoToCloudinary(fileThumbnail);

  await Project.create({
    user: userId,
    title: projectInfo.title,
    thumbnail: imgUploaded?.url,
    shortDescription: projectInfo.shortDescription,
    "library.content": projectInfo.content,
  });

  await User.findByIdAndUpdate(
    userId,
    {
      $inc: { "info.projectCount": 1 },
    },
    { new: true }
  );
};

const changeThumbnail = async (projectId, fileThumbnail, oldThumbnail) => {
  if (!projectId || !fileThumbnail || !oldThumbnail)
    throw new Error(
      "projectId, fileThumbnail or oldThumbnail is required || changeThumbnail"
    );

  const imgUploaded = await uploadPhotoToCloudinary(fileThumbnail);

  await Project.findByIdAndUpdate(
    projectId,
    {
      thumbnail: imgUploaded?.url,
    },
    { new: true }
  );

  // Remove old project thumbnail from cloudinary
  const fileName = getPublicId(oldThumbnail);
  await deleteCloudinaryPhotoById(fileName);
};

const updateProject = async (
  projectId,
  content = "",
  shortDescription = "",
  title
) => {
  if (!projectId || !content || !shortDescription)
    throw new Error(
      "projectId, content or shortDescription is required || updateProject"
    );

  if (title) {
    await Project.findByIdAndUpdate(
      projectId,
      {
        "library.content": content,
        shortDescription: shortDescription,
        title: title,
        slug: slugify(title),
      },
      {
        new: true,
      }
    );
  } else {
    await Project.findByIdAndUpdate(
      projectId,
      {
        "library.content": content,
        shortDescription: shortDescription,
      },
      {
        new: true,
      }
    );
  }
};

const getProjectBySlug = async (slug) => {
  if (!slug) throw new Error("slug is required || getProjectBySlug");
  const project = await Project.findOne({ slug, isHide: false }).populate(
    "user",
    "fullName profilePhoto username info.bio"
  );

  if (!project) throw new Error("Project Not Found or Project Was Hidden");
  return project;
};

const getProjectById = async (id) => {
  if (!id) throw new Error("id is required || getProjectById");
  const project = await Project.findById(id);

  if (!project) throw new Error("Project Not Found or Project Was Hidden");
  return project;
};

const getOwnProject = async (userId, page, sortPass, typePass, querySearch) => {
  if (!userId || !page)
    throw new Error("userId, page is required || getOwnProject");

  // Search query
  let query = { user: userId };
  if (querySearch) {
    const searchQuery = {
      title: {
        $regex: querySearch,
        $options: "i",
      },
    };
    query = { ...query, ...searchQuery };
  }
  // Type query
  let typeQuery = {};
  switch (typePass) {
    case "public":
      typeQuery = {
        isHide: false,
      };
      break;
    case "private":
      typeQuery = { isHide: true };
      break;
    default:
  }
  query = { ...query, ...typeQuery };

  // Sorting
  let sort = {};
  switch (sortPass) {
    case "name":
      sort = {
        title: 1,
      };
      break;
    case "stars":
      sort = {
        starCount: -1,
      };
      break;
    default:
      sort = { createdAt: -1 };
  }
  const select = "-user -library";
  const limit = PROJECTS_PER_PAGE;

  const projectList = await paginationFindQuery({
    model: Project,
    select,
    query,
    sort,
    limit,
    page,
  });

  return projectList;
};

const getProjectByUsername = async (username, page, sortPass, querySearch) => {
  if (!username || !page || !sortPass)
    throw new Error(
      "username , page or sortPass is required || getProjectByUsername"
    );

  const user = await User.findOne({ username }).select("_id");
  if (!user) throw new Error("User Not Found || getProjectByUsername");

  let query = { user: user?.id, isHide: false };
  if (querySearch) {
    const searchQuery = {
      title: {
        $regex: querySearch,
        $options: "i",
      },
    };
    query = { ...query, ...searchQuery };
  }
  const select = "-user -library";
  let sort = {};
  switch (sortPass) {
    case "name":
      sort = {
        title: 1,
      };
      break;
    case "stars":
      sort = {
        starCount: -1,
      };
      break;
    default:
      sort = { createdAt: -1 };
  }
  const limit = PROJECTS_PER_PAGE;

  const projectList = await paginationFindQuery({
    model: Project,
    select,
    query,
    sort,
    limit,
    page,
  });

  return projectList;
};

const savingProject = async (userId, projectId) => {
  if (!userId || !projectId)
    throw new Error("userId and projectId is required || savingProject");

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      // append a specified value to an array
      // Docs: https://www.mongodb.com/docs/manual/reference/operator/update/push/
      $push: { "info.savedProject": projectId },
    },
    { new: true }
  );

  await Project.findByIdAndUpdate(
    projectId,
    {
      $inc: { starCount: 1 },
    },
    { new: true }
  );
  return updatedUser.info.savedProject;
};

const getSavedProject = async (listProjectIds, page, sortPass, querySearch) => {
  if (!listProjectIds)
    throw new Error("listProjectIds is required || getSavedProject");

  const limit = PROJECTS_PER_PAGE;
  const populate = "user";
  const populateSelect = "fullName username profilePhoto";

  let query = {
    _id: { $in: listProjectIds },
    isHide: false,
  };

  if (querySearch) {
    const searchQuery = {
      title: {
        $regex: querySearch,
        $options: "i",
      },
    };
    query = { ...query, ...searchQuery };
  }

  let sort = {};
  switch (sortPass) {
    case "name":
      sort = {
        title: 1,
      };
      break;
    case "stars":
      sort = {
        starCount: -1,
      };
      break;
    default:
      sort = { createdAt: -1 };
  }

  const projectList = await paginationWithArrayIds({
    model: Project,
    query,
    page,
    populate,
    populateSelect,
    limit,
    sort,
  });

  return projectList;
};

const removeSavingProject = async (userId, projectId) => {
  if (!userId || !projectId)
    throw new Error("userId and projectId is required || savingProject");

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      // append a specified value to an array
      // Docs: https://www.mongodb.com/docs/manual/reference/operator/update/push/
      $pull: { "info.savedProject": projectId },
    },
    { new: true }
  );

  await Project.findByIdAndUpdate(
    projectId,
    {
      $inc: { starCount: -1 },
    },
    { new: true }
  );
  return updatedUser.info.savedProject;
};

const hideProject = async (projectId) => {
  if (!projectId) throw new Error("projectId is required || hideProject");

  const project = await Project.findById(projectId);

  if (!project) throw new Error("Project Not Found || hideProject");

  if (project?.isHide) {
    project.isHide = false;
  } else {
    project.isHide = true;
  }

  await project.save();
};

const uploadPreviewVideo = async (
  projectId,
  previewVideo,
  oldPreviewVideoUrl
) => {
  if (!projectId || !previewVideo)
    throw new Error(
      "projectId or previewVideo is required || uploadPreviewVideo"
    );

  const video = await uploadVideoToCloudinary(previewVideo);
  if (!video)
    throw new Error("Can not upload your preview video || uploadPreviewVideo");

  await Project.findByIdAndUpdate(
    projectId,
    {
      "library.previewVideo": video?.url,
    },
    { new: true }
  );

  // Remove the old video - ERROR
  // if (oldPreviewVideoUrl) {
  //   const videoId = getPublicId(oldPreviewVideoUrl);
  //   await deleteCloudinaryVideoById(videoId);
  // }
};

const getNewestProjects = async ()=>{
  const projectList = await Project.find({ isHide: false })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("slug thumbnail title starCount")
    .populate("user", "username profilePhoto");

  return projectList
}

const getPopularProjects = async () => {
  const projectList = await Project.find({ isHide: false })
    .sort({ starCount: -1 })
    .limit(10)
    .select("slug thumbnail title starCount")
    .populate("user", "username profilePhoto");

  return projectList;
};

//// [ADMIN]
const getAllProject = async (page) => {
  const projectList = await Project.find()
    .populate("user", "fullName profilePhoto username info.bio")
    .limit(10)
    .skip(10 * (Number(page) - 1));

  return projectList;
};

module.exports = {
  createProject,
  updateProject,
  getProjectBySlug,
  getProjectById,
  getOwnProject,
  getProjectByUsername,
  isOwnerProject,
  savingProject,
  removeSavingProject,
  getSavedProject,
  hideProject,
  uploadPreviewVideo,
  getAllProject,
  changeThumbnail,
  getNewestProjects,
  getPopularProjects,
};
