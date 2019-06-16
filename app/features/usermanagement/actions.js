import {constants} from './constants';
import {services} from "./services";
import type { Store} from '../../store/reducers/types';
import {openSnackBar} from "../ui";

export const profileActions = {
  fetchProfile,
  updateProfile
};

export function fetchProfile() {
  console.log("Fetch profile request");
  return (dispatch: any , getState: Store) => {
    const { securityState } = getState();
    const { access_token } = securityState.user;

    dispatch(request({ access_token }));

    services.fetchProfile(access_token)
      .then(
        (profile) => {
          console.log(profile);
          dispatch(success(profile));
        },
        (error: any) => {
          dispatch(failure());
        }
      );
  };

  function request(access_token: {access_token: string}) { return { type: constants.PROFILE_FETCH_REQUEST, access_token } }
  function success(profile: Object ){ return { type: constants.PROFILE_FETCH_SUCCESS, profile } }
  function failure() {
    return {
      type: constants.PROFILE_FETCH_FAILURE
    }
  }
}
export function updateProfile(profile: Object) {
  console.log(" UpdateProfile request");
  return (dispatch: any , getState: Store) => {
    const { securityState } = getState();
    const { access_token } = securityState.user;

    dispatch(request({ profile }));

    services.updateProfile(access_token , profile)
      .then(
        (response) => {

          const {responseStatus} = response;
          console.log(responseStatus);
          dispatch(success(profile));
          dispatch(openSnackBar(responseStatus , 'success'));

        },
        (error: any) => {
          dispatch(openSnackBar(error , 'error'));

        }
      );
  };

  function request(profile: {profile: Object}) { return { type: constants.PROFILE_UPDATE_REQUEST, profile } }
  function success(profile: Object ){ return { type: constants.PROFILE_UPDATE_SUCCESS, profile } }

}
