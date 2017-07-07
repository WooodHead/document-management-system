/* global describe, expect, it, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from '../helper/axiosMock';
import * as userActions from '../../actions/userActions';
import actionTypes from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockLocalStorage = {
  getItem: (key) => {
    if (key === 'id_token') { return 'somerandomvalue'; }
    return null;
  },
  removeItem: (key) => {
    return key;
  },
  setItem: jest.fn(),
};

global.localStorage = mockLocalStorage;

describe('User Actions', () => {
  
  it('Should login user', () => {
    const store = mockStore();
    return store.dispatch(userActions.loginUser({ username: 'ss', password: '' }))
      .then(() => {
        const expectedAction = store.getActions();
        expect(expectedAction.length).toBe(1);
        expect(expectedAction[0].type).toEqual(actionTypes.LOGIN_USER);
        expect(expectedAction[0].user.fullNames).toEqual('Etanuwoma John');
        expect(expectedAction[0].user.RoleId).toBe(1);
      });
  });

  it('Should register a new user', () => {
    const store = mockStore();
    return store.dispatch(userActions.registerUser({ username: 'ss', password: '' }))
      .then(() => {
        const expectedAction = store.getActions();
        expect(expectedAction.length).toBe(1);
        expect(expectedAction[0].type).toEqual(actionTypes.LOGIN_USER);
        expect(expectedAction[0].user.fullNames).toEqual('Etanuwoma John');
        expect(expectedAction[0].user.RoleId).toBe(1);
      });
  });
});