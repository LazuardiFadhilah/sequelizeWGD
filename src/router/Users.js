const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const userController = require("../controller/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /users/register:
 *  post:
 *    tags: [Users]
 *    description: Store user
 *    security:
 *        - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nama:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.post("/register", [auth()], userController.store);


/**
 * @swagger
 * /users/:
 *  get:
 *    tags: [Users]
 *    description: Get all data Users
 *    parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *         type: Number
 *         default: 1
  *      - in: query
 *        name: pageSize
 *        required: false
 *        schema:
 *         type: Number
 *         default: 10
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.get("/", userController.index);


router.post("/login", userController.login);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    tags: [Users]
 *    description: Delete data byId
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.get("/:id", userController.show);


/**
 * @swagger
 * /users/{id}:
 *  put:
 *    tags: [Users]
 *    description: Update data Users
 *    parameters:
 *      - in: path
 *        name: id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nama:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.put("/:id", userController.update);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    tags: [Users]
 *    description: Delete data Users
 *    security:
 *        - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.delete("/:id",[auth()], userController.delete);

module.exports = router;
