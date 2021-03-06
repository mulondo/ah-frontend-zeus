import Enzyme from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { EDIT_USER_PROFILE } from '../../../constants';
import { editProfile, savePhoto } from '../../../actions/userprofile';

Enzyme.configure({ adapter: new EnzymeAdapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const API_HOST_URL = process.env.API_URL;

it('test editprofile action', () => {
  const url = `${API_HOST_URL}/users/profiles/`;

  fetchMock.putOnce(url, {
    body: {
      photo:
        'https://res.cloudinary.com/dhmiym9kh/image/upload/v1548157703/m0yfsbokq47e8jxhhbos.jpg',
      bio: 'sam',
      fun_fact: 'swimming'
    },
    headers: { 'content-type': 'application/json' }
  });

  const expectedActions = [
    {
      type: EDIT_USER_PROFILE,
      payload: {
        photo:
          'https://res.cloudinary.com/dhmiym9kh/image/upload/v1548157703/m0yfsbokq47e8jxhhbos.jpg',
        bio: 'sam',
        fun_fact: 'swimming'
      }
    }
  ];
  const store = mockStore();

  return store
    .dispatch(editProfile())
    .then(() => expect(store.getActions()).toEqual(expectedActions));
});


it('test save photo to cloudinary', () => {
  const url = 'https://api.cloudinary.com/v1_1/dhmiym9kh/upload';

  fetchMock.postOnce(url, {
    body: {
      photo:
        'https://res.cloudinary.com/dhmiym9kh/image/upload/v1548157703/m0yfsbokq47e8jxhhbos.jpg',
      bio: 'sam',
      fun_fact: 'swimming'
    },
    headers: { 'content-type': 'application/json' }
  });

  const expectedActions = [];
  const store = mockStore();
  return store
    .dispatch(savePhoto())
    .then(() => expect(store.getActions()).toEqual(expectedActions));
});

