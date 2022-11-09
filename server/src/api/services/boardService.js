const Board = require("../models/boardModel");
const Section = require("../models/sectionModel");

const checkUserOwnBoardById = async (userId, boardId) => {
  if (!userId || !boardId)
    throw new Error("userId and boardId  is required || checkUserOwnBoardById");

  const board = await Board.findById(boardId);
  if (!board) throw new Error("Board Not Found || checkUserOwnBoardById");

  if (board?.user?.toString() === userId?.toString()) return true;
  throw new Error("You Not Own This Board || checkUserOwnBoardById");
};

const checkUserOwnBoard = async (userId, board) => {
  if (!userId || !board)
    throw new Error("userId and board  is required || checkUserOwnBoard");

  if (board?.user?.toString() === userId?.toString()) return true;
  throw new Error("You Not Own This Board || checkUserOwnBoard");
};

const createBoard = async (userId) => {
  if (!userId) throw new Error("userId is required || createBoard");
  const boardsCount = await Board.find({ user: userId }).count();

  const board = await Board.create({
    user: userId,
    position: boardsCount > 0 ? boardsCount : 0,
  });

  return board;
};

const getAllBoards = async (userId) => {
  if (!userId) throw new Error("userId is required || getAllBoards");

  const boards = await Board.find({ user: userId }).sort({
    position: -1,
  });

  return boards;
};

const updatePosition = async (boards) => {
  if (!boards) throw new Error("boards is required || updatePosition");

  try {
    for (const key in boards?.reverse()) {
      const board = boards[key];

      await Board.findByIdAndUpdate(board.id, {
        $set: {
          position: key,
        },
      });
    }
  } catch (error) {
    throw new Error(`${error} || updatePosition`);
  }
};

const getOne = async (userId, boardId) => {
  if (!userId || !boardId)
    throw new Error("userId and boardId is required || getOne");

  const board = Board.findOne({ user: userId, _id: boardId });
  if (!board) throw new Error("Board Not Found || getOne");

  const sections = await Section.find({ board: boardId });
  if (sections?.length > 0) {
    for (const section of sections) {
      const tasks = await Task.find({ section: section?.id })
        .populate("section")
        .sort({ position: -1 });
      section._doc.tasks = tasks;
    }
    board._doc.sections = sections;
  } else {
    board._doc.sections = []; // BUG
  }

  return board;
};

const update = async (boardId, content) => {
  if (!boardId || !content)
    throw new Error("boardId and content is required || update");

  let newInfo = content;

  const currentBoard = await Board.findById(boardId);
  if (!currentBoard) throw new Error("Board Not Found || update");

  if (currentBoard.isFavorite !== newInfo?.isFavorite) {
    const favorites = await Board.find({
      user: currentBoard?.user,
      isFavorite: true,
      _id: { $ne: boardId },
    }).sort({
      favoritePosition: 1,
    });

    if (newInfo?.isFavorite) {
      newInfo.favoritePosition = favorites?.length > 0 ? favorites.length : 0;
    } else {
      for (const key in favorites) {
        const element = favorites[key];
        await Board.findByIdAndUpdate(element.id, {
          $set: { favoritePosition: key },
        });
      }
    }
  }

  const board = await Board.findByIdAndUpdate(
    boardId,
    { $set: newInfo },
    { new: true }
  );

  return board;
};

const getFavorites = async (userId) => {
  if (!userId) throw new Error("userId is required || getFavorites");
  const favorites = await Board.find({
    user: userId,
    isFavorite: true,
  }).sort({
    favoritePosition: -1,
  });

  return favorites;
};

const updateFavoritePosition = async (boards) => {
  if (!boards) throw new Error("boards is required || updateFavoritePosition");

  for (const key in boards?.reverse()) {
    const board = boards[key];
    await Board.findByIdAndUpdate(board?.id, {
      $set: { favoritePosition: key },
    });
  }
};

const deleteBoard = async (boardId) => {
  if (!boardId) throw new Error("boardId is required || deleteBoard");

  const sections = await Section.find({ board: boardId });
  for (const section of sections) {
    await Task.deleteMany({ section: section.id });
  }

  await Section.deleteMany({ board: boardId });

  const currentBoard = await Board.findById(boardId);

  if (currentBoard.isFavorite) {
    const favorites = await Board.find({
      user: currentBoard?.user,
      isFavorite: true,
      _id: { $ne: boardId },
    }).sort({
      favoritePosition: -1,
    });

    for (const key in favorites) {
      const element = favorites[key];
      await Board.findByIdAndUpdate(element.id, {
        $set: {
          favoritePosition: key,
        },
      });
    }
  }

  const boards = await Board.find().sort({
    position: 1,
  });
  for (const key in boards) {
    const board = boards[key];
    await Board.findByIdAndUpdate(board?.id, {
      $set: {
        position: key,
      },
    });
  }
};

module.exports = {
  checkUserOwnBoardById,
  checkUserOwnBoard,
  createBoard,
  getAllBoards,
  updatePosition,
  getOne,
  update,
  getFavorites,
  updateFavoritePosition,
  deleteBoard,
};
