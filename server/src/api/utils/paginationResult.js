// countDocument DOCS: https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/
// estimatedDocumentCount: https://www.mongodb.com/docs/manual/reference/method/db.collection.estimatedDocumentCount/

const paginationFindQuery = async ({ ...rest }) => {
  const {
    model,
    select = "",
    query = {},
    sort = {},
    limit = 10,
    page = 1,
    populate = "",
  } = rest;
  let result = {};
  const results = await model
    .find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .select(select)
    .populate(populate);

  try {
    // estimatedDocumentCount is fastest for counting all the docs but not have filter
    // countDocuments have filter
    const count = await model?.countDocuments(query);
    result = {
      totalRows: count,
      results,
      meta: {
        page,
        limit,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
  return { ...result };
};

const paginationWithArray = ({ ...rest }) => {
  const { limit = 10, page = 1, list, callback, filterCallback, query } = rest;

  let results = list?.slice((page - 1) * limit, page * limit);
  let totalRows = list?.length;

  if (query) {
    results = filterCallback(results, query);
    totalRows = results?.length;
  }

  results = callback ? callback(results) : results;

  return {
    totalRows,
    results,
    meta: {
      page,
      limit,
    },
  };
};

const paginationWithArrayIds = async ({ ...rest }) => {
  const {
    page = 1,
    model,
    populate = "",
    populateSelect = "",
    query = {},
    sort = {},
    select = {},
    limit = 10,
  } = rest;

  let results = await model
    .find(query)
    .sort(sort)
    .select(select)
    .populate(populate, populateSelect);

  const totalRows = results?.length;
  results = results?.slice((page - 1) * limit, page * limit);

  return {
    totalRows,
    results,
    meta: {
      page,
      limit,
    },
  };
};

module.exports = {
  paginationFindQuery,
  paginationWithArray,
  paginationWithArrayIds,
};
