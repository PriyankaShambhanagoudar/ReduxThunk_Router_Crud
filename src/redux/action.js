import * as types from "./actionType";
import axios from "axios";

//get
const getusers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});
//delete
const userDeleted = () => ({
  type: types.DELETE_USERS,
});

//post
const userAdded = () => ({
  type: types.POST_USERS,

});

//single
const getSingleuserData = (user) => ({
  type: types.GET_SINGLE_USERS,
  payload: user,
});


//UPDATE
const updateuser = () => ({
  type: types.UPDATE_USERS

});
export const loadUser = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getusers(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userDeleted());
        dispatch(loadUser());
      })
      .catch((error) => console.log(error));
  };
};
export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, user)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userAdded());
        dispatch(loadUser());
      })
      .catch((error) => console.log(error));
  };
};
//edit
export const getSingleUser = (id) => {

  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getSingleuserData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const updateUser = (user, id) => {

  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, user)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(updateuser());
      })
      .catch((error) => console.log(error));
  };
};