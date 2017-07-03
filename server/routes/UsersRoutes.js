import UsersController from '../controllers/UsersController';
import Access from '../middleware/Access';

const UsersRoutes = (router) => {
  router.use(Access.init);
  /**
   * @swagger
   * definition:
   *   User:
   *     type: object
   *     required:
   *        - fullNames
   *        - username
   *        - email
   *        - password
   *        - RoleId
   *     properties:
   *        fullNames:
   *            type: string
   *        username:
   *            type: string
   *        email:
   *            type: string
   *        password:
   *            type: string
   *        RoleId:
   *            type: number
   */

  router.route('/users')

    /**
     * @swagger
     * /api/users:
     *   get:
     *     tags:
     *       - Users
     *     description: Gets list of users
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: x-access-token
     *         description: request x-access-token
     *         in: header
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Users List
     *         schema:
     *           $ref: '#/definitions/Documents'
     */
    .get(Access.verifyToken, Access.isAdmin, UsersController.getAllUsers)
    /**
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     description: Creates a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: fullNames
   *         description: User firstname and lastname
   *         in: form
   *         required: true
   *         type: string
   *       - name: username
   *         description: username of user
   *         in: form
   *         required: true
   *         type: string
   *       - name: email
   *         description: email of user
   *         in: form
   *         required: true
   *         type: string
   *       - name: password
   *         description: password of user
   *         in: form
   *         required: true
   *         type: string
   *       - name: RoleId
   *         description: user role
   *         in: form
   *         required: true
   *         type: number
   *     responses:
   *       201:
   *         description: User Object created
   *         schema:
   *           $ref: '#/definitions/User'
   */
    .post(UsersController.signUp);
  /**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: Signs in a user
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: username
 *         description: username
 *         in: form
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: form
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Logged in User
 *         schema:
 *           $ref: '#/definitions/User'
 */
  router.route('/users/login')
    .post(UsersController.login);

  router.route('/users/:id')
    /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     description: Updates a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: x-access-token
   *         description: request x-access-token
   *         in: header
   *         required: true
   *         type: string
   *       - name: id
   *         description: user id
   *         in: path
   *         required: true
   *         type: number
   *       - name: fullNames
   *         description: user full names
   *         in: form
   *         required: false
   *         type: string
   *       - name: password
   *         description: user password
   *         in: form
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: User Object updated
   *         schema:
   *           $ref: '#/definitions/User'
   */
    .put(Access.verifyToken, UsersController.updateUser)
    /**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Gets User by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: user email or username
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User
 *         schema:
 *           $ref: '#/definitions/User'
 */
    .get(Access.verifyToken, UsersController.getUser)
    /**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: user deleted successfully
 *         schema:
 *           $ref: '#/definitions/User'
 */
    .delete(Access.verifyToken,
    Access.isAdmin,
    Access.canDeleteUser,
    UsersController.deleteUser);
  /**
 * @swagger
 * /api/users/logout:
 *   post:
 *     description: Signs out a user
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: x-access-toke
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Logged out
 *         schema:
 *           $ref: '#/definitions/User'
 */
  router.route('/users/logout')
    .post(UsersController.logout);
  /**
   * @swagger
   * /api/search/users?q={fullNames}:
   *    get:
   *      description: Finds a user by their names
   *      tags:
   *        - Users
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: x-access-token
   *          in: header
   *          description: request x-access-token
   *          required: true
   *          type: string
   *        - name: q
   *          in: path
   *          description: fullNames of the user
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: user
   *          schema:
   *            type: object
   */
  router.route('/search/users')
    .get(Access.verifyToken, UsersController.searchUsers);
};

export default UsersRoutes;
