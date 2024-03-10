const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User management API
 */


/**
 * @swagger
 * /Auth/register:
 *  post:
 *    tags: [Auth]
 *    description: Store user
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
router.post("/register", authController.register);

/**
 * @swagger
 * /Auth/login:
 *  post:
 *    tags: [Auth]
 *    description: Login Data User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
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
router.post("/login", authController.login);


/**
 * @swagger
 * /Auth/refresh-token:
 *  post:
 *    tags: [Auth]
 *    description: refresh Token
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refreshToken:
 *                type: string
 *    responses:
 *     200:
 *      description: Success update user
 *     400:
 *      description: Error
 *     500:
 *      description: Internal Server Error
 */
router.post("/refresh-token", authController.refreshToken);

module.exports = router;