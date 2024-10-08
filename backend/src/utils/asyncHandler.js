//wrapper function

// const asyncHandler = (requestHandler) => async (req, res, next) => {
//   try {
//     await requestHandler(req, res, next);
//   } catch (error) {
//     res
//       .status(error.code || 500)
//       .json({ error: error.message || "Something went wrong" });
//   }
// };

const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;
