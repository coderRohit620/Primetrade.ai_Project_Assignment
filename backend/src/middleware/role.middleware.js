import { ApiError } from "../utils/ApiError.js";

export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user exists
    if (!req.user) {
      throw new ApiError(401, "Unauthorized access");
    }

    // Check role permission
    if (
        !allowedRoles
            .map((role) => role.toLowerCase())
            .includes(req.user.role.toLowerCase())
        ) {
                throw new ApiError(
                    403,
                    `Role (${req.user.role}) is not allowed to access this resource`
                );
            } 

    next();
  };
};