export const OTP_EXPIRY_TIME = 600000;
export const UNAUTHORIZED = "unauthorized jwt must be provided"
export const NOT_FOUND = "user id not found"
export const SOFT_DELETED="List soft‑deleted users"
export const OTP_MESSAGES = {
  OTP_CREATE_SUMMARY: "Generates an OTP for a given user id",
  OTP_VERIFY_SUMMARY: "Verify an OTP for a given userId or OTP",
  USER_ID_REQUIRED: "User ID is required",
  OTP_GENERATED_SUCCESS: "OTP generated successfully",
  USER_ID_EXISTS: "User ID already exists",
  OTP_VERIFIED: "OTP Verified",
  OTP_EXPIRED: "OTP expired",
  OTP_SEND_FAILED: "Failed to send OTP email",
};
export const USER_MESSAGES = {
 LIST_USERS: "List all the users",
  LIST_USERS_ID: "List users based on id",
  USER_ID_REQUIRED: "User ID is required",
  DELETE_USER:"To delete a user"
};

export const AUTH_MESSAGES = {
  SIGNUP_SUMMARY:"Register a new user",
   USER_CREATION:"User created successfully",
   CONFLICT:"User already exists",
   SIGNIN_SUMMARY:"Login api",
   USER_LOGIN:"User login successfull.",
   LOGIN_FAILUAR:"Required field email or password not found"
 };

 export const ADMIN_MESSAGES = {
  ACTIVATE_USER_SUMMARY: "Activate a user by admin",
  ACTIVATE_USER_SUCCESS: "User activated",
  ACTIVATE_USER_NOT_FOUND: "User not found",

  LIST_USERS_SUMMARY: "List all the users",

  LIST_DELETED_USERS_SUMMARY: "List soft‑deleted users",
  LIST_DELETED_USERS_SUCCESS: "Array of deleted users",

  LIST_OTPS_SUMMARY: "List all OTP entries",
  LIST_OTPS_SUCCESS: "Array of OTP records with user data",
};
