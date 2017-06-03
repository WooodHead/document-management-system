import UsersController from '../controllers/UsersController';
import DocumentsController from '../controllers/DocumentsController';

const UsersRoutes = (router) => {
  router.route('/users')
    .get(UsersController.getAllUsers)
    .post(UsersController.signUp);

  router.route('/users/login')
    .post(UsersController.login);

  router.route('/users/:id')
    .put(UsersController.updateUser)
    .get(UsersController.getUser)
    .delete(UsersController.deleteUser);

  router.route('/users/logout')
    .post(UsersController.logout);

  router.route('/search/users')
    .get(UsersController.searchUsers);
};

export default UsersRoutes;
