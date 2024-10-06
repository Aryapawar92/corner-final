//wrapper function

const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {
    res.status(err.code || 500).json({ error: error.message, success: false });
  }
};

export default asyncHandler;

// const asyncHandler = (requestHandler) => {
//     return async( req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch(next);
//     }
// }
