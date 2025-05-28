// import { StatusCodes } from "http-status-codes";

// export const validate = (schema) => {
//   return async (req, res, next) => {
//     const error = await schema.parseAsync(req.body);

//     if (error) {
//       return res.status(StatusCodes.BAD_REQUEST).json(error);
//     }

//     next();
//   };
// };
