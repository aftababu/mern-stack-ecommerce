import axios from "../axios";
import {
  clearErrors,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  userFail,
  userRequest,
  userSuccess,
} from "../slice/userSlice";
import {
  profileFail,
  profileRequest,
  profileSuccess,
} from "../slice/profileSlice";
import {
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
} from "../slice/forgotPasswordSlice";
import {
  allUserFail,
  allUserRequest,
  allUserSuccess,
} from "../slice/allUserSlice";
import {
  userDeleteSuccess,
  userUpdateFail,
  userUpdateRequest,
  userUpdateSuccess,
} from "../slice/userControllerSlice";
import { userDetailFail, userDetailRequest, userDetailSuccess } from "../slice/userDetailSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userRequest());

    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // console.log(data);
    dispatch(userSuccess(data.user));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(userRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);
    // console.log(data);
    dispatch(userSuccess(data.user));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

// clearing errors
export const clearError = () => async (dispatch) => {
  dispatch(clearErrors());
};

// load user

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.get(`/api/v1/me`);
    // console.log(data);

    dispatch(userSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

// update profile

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(profileRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, {
      withCredentials: true,
      headers: config,
    });
    dispatch(profileSuccess(data.success));
  } catch (error) {
    dispatch(profileFail(error.response.data.message));
  }
};

// update password

export const updatePassword = (userData) => async (dispatch) => {
  try {
    dispatch(profileRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1//password/update`, userData, {
      headers: config,
    });
    dispatch(profileSuccess(data.success));
  } catch (error) {
    dispatch(profileFail(error.response.data.message));
  }
};

// forgot password

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1//password/forgot`, email, {
      headers: config,
    });
    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};
export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1//password/forgot`, email, {
      headers: config,
    });
    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

// get all user  -----admin
export const getAllUser = () => async (dispatch) => {
  try {
    dispatch(allUserRequest());
    const { data } = await axios.get("/api/v1/admin/users");
    console.log(data);
    dispatch(allUserSuccess(data.users));
  } catch (error) {
    dispatch(allUserFail(error.response.data.message));
  }
};
// get all user  -----admin
export const getUserDetail = (id) => async (dispatch) => {
  try {
    dispatch(userDetailRequest());
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    console.log(data);
    dispatch(userDetailSuccess(data.user));
  } catch (error) {
    dispatch(userDetailFail(error.response.data.message));
  }
};
export const updateUser = (id, updateData) => async (dispatch) => {
  try {
    dispatch(userUpdateRequest());
    const { data } = await axios.put(`/api/v1/admin/user/${id}`, updateData, {
      headers: "application/json",
    });
    console.log(data);
    dispatch(userUpdateSuccess(data));
  } catch (error) {
    dispatch(userUpdateFail(error.response.data.message));
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(userUpdateRequest());
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    console.log(data);
    dispatch(userDeleteSuccess(data));
  } catch (error) {
    dispatch(userUpdateFail(error.response.data.message));
  }
};
