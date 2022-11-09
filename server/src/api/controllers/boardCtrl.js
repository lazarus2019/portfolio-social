const expressAsyncHandler = require("express-async-handler");
const {
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
} = require("../services/boardService");
const validateMongoDbID = require("../utils/validateMongoDbID");

//// Create board
const boardCreateCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  try {
    const newBoard = await createBoard(_id);

    res.status(200).json({ status: true, board: newBoard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get all board by user
const boardGetAllCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  try {
    const boards = await getAllBoards(_id);

    res.status(200).json({ status: true, results: boards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Update board position
const boardUpdatePositionCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { boards } = req?.body;
  try {
    await updatePosition(boards);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Get all favorite boards
const boardGetFavoritesCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  try {
    const boards = await getFavorites(_id);

    res.status(200).json({ status: true, results: boards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Update favorite position boards
const boardUpdateFavoritesPositionCtrl = expressAsyncHandler(
  async (req, res) => {
    const { boards } = req?.body;
    try {
      await updateFavoritePosition(boards);

      res.status(200).json({ status: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//// Get board by id
const boardGetOneCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { boardId } = req?.params;
  validateMongoDbID(boardId);

  try {
    await checkUserOwnBoardById(_id, boardId);
    const board = await getOne(_id, boardId);

    res.status(200).json({ status: true, results: board });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Update board
const boardUpdateCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { boardId } = req?.params;
  validateMongoDbID(boardId);
  const { title, description, isFavorite } = req?.body;

  try {
    await checkUserOwnBoardById(_id, boardId);

    const newBoard = await update(boardId, { title, description, isFavorite });

    res.status(200).json({ status: true, results: newBoard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// Delete board
const boardDeleteCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { boardId } = req?.params;
  validateMongoDbID(boardId);

  try {
    await checkUserOwnBoardById(_id, boardId);

    await deleteBoard(boardId);

    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  boardCreateCtrl,
  boardGetAllCtrl,
  boardUpdatePositionCtrl,
  boardGetFavoritesCtrl,
  boardUpdateFavoritesPositionCtrl,
  boardGetOneCtrl,
  boardUpdateCtrl,
  boardDeleteCtrl,
};
