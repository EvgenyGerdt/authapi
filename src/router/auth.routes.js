const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный id
 *         username:
 *           type: string
 *           description: Имя пользователя
 *         email:
 *           type: string
 *           description: Почтовый адрес пользователя
 *         password:
 *           type: string
 *           description: Пароль пользователя
 *         createdAt:
 *           type: date
 *           description: Дата регистрации пользователя
 *       example:
 *         username: EvgenyGerdt
 *         email: test@mail.com
 *         password: 123Test123
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Авторизация и регистрация пользователя
 */

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal Server Error
 */

router.route('/sign-up').post(register);

/**
 * @swagger
 * components:
 *   schemas:
 *     Credentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Почтовый адрес пользователя
 *         password:
 *           type: string
 *           description: Пароль пользователя
 *       example:
 *         email: test@mail.com
 *         password: 123Test123
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       required:
 *         - user
 *         - token
 *       properties:
 *         user:
 *           type: object
 *           description: Данные пользователя
 *         token:
 *           type: string
 *           description: Токен пользователя
 *       example:
 *         user:
 *           _id: 21rkoewi2jt010
 *           email: test@test.com
 *           password: <HashedPassword>
 *           createdAt: 12.12.2021
 *         token: 439-18986gd90wjgjr1opru
 */

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Credentials'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

router.route('/sign-in').post(login);

module.exports = router;