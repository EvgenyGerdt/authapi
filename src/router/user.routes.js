const express = require('express');
const authJwt = require('../middlewares/authJwt.middleware');
const { getUser } = require('../controllers/user.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfo:
 *       type: object
 *       required:
 *         - user
 *         - token
 *       properties:
 *         user:
 *           type: object
 *           description: Данные пользователя
 *       example:
 *         user:
 *           _id: 21rkoewi2jt010
 *           email: test@test.com
 *           password: <HashedPassword>
 *           createdAt: 12.12.2021
 */

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   post:
 *     summary: Получение данных пользователя
 *     tags: [UserInfo]
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *     - in: Authorization
 *       schema:
 *         type: string
 *       required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.route('/:id').get([authJwt.verifyToken], getUser);

module.exports = router;