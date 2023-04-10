const express = require("express")
const router = express.Router()

// Importing User controller methods
// prettier-ignore
const { 
  loginUser, 
  verifyUser, 
  getUsername, 
  getUsers, 
  updatePassword, 
  updateEmail, 
  updatePasswordAdmin, 
  updateEmailAdmin,
  updateActiveStatusAdmin,
  createUserAdmin
} = require("../contollers/userController")

// Importing Group controller methods
// prettier-ignore
const { 
  checkGroup, 
  getUserGroups, 
  getGroups,
  addUserToGroupAdmin,
  rmvUserFrGroupAdmin,
  createGroupAdmin
} = require("../contollers/groupController")

// Importing interceptors
// prettier-ignore
const { 
  isAutheticatedUser,
  authorizedAdmin
 } = require("../middlewares/auth")

// GET, POST, PUT, DELETE methods are defined here

// functions
router.route("/user/login").post(loginUser) // (username, password) => (token)

// update user's profile with token
router.route("/user/verify").get(verifyUser) // (token) => (true/false)
router.route("/user/getusername").get(getUsername) // (token) => (username)
router.route("/user/update_password").put(isAutheticatedUser, updatePassword) // (token) => (true/false)
router.route("/user/update_email").put(isAutheticatedUser, updateEmail) // (token) => (true/false)
router.route("/group/user").get(getUserGroups) // (token) => (object of groups)
router.route("/group/checkgroup").post(checkGroup) // (token, group_name) => (true/false)

// admin update user // NEED TO AUTH TOKEN IS ADMIN
// get details of all users
router.route("/users").get(getUsers) // () => (user details)
router.route("/groups").get(getGroups) // () => (group details)

// to perform user updates as admin
router.route("/user/update_password_admin").put(isAutheticatedUser, authorizedAdmin, updatePasswordAdmin) // (username, password) => (true/false)
router.route("/user/update_email_admin").put(isAutheticatedUser, authorizedAdmin, updateEmailAdmin) // (username, email) => (true/false)
router.route("/user/update_activeStatus_admin").put(isAutheticatedUser, authorizedAdmin, updateActiveStatusAdmin) // (username, activeStatus) => (true/false)
router.route("/group/add_user_to_group_admin").post(isAutheticatedUser, authorizedAdmin, addUserToGroupAdmin) // (username, group_name) => (true/false)
router.route("/group/rmv_user_fr_group_admin").post(isAutheticatedUser, authorizedAdmin, rmvUserFrGroupAdmin) // (username, group_name) => (true/false)
router.route("/group/create_group_admin").post(isAutheticatedUser, authorizedAdmin, createGroupAdmin) // (group_name) => (true/false)
router.route("/user/create_user_admin").post(isAutheticatedUser, authorizedAdmin, createUserAdmin) // (username, password, email) => (true/false)

module.exports = router