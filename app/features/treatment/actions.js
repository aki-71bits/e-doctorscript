import {constants} from './constants';
import {services} from "./services";
import type {Store} from "../../store/reducers/types";
import {openSnackBar} from "../ui";

export const treatmentActions = {
  saveTreatment,
  fetchTreatment,
  updateTreatmentMedicine
};

export function saveTreatment(value: object) {
  console.log("inside saveTreatment");
  return (dispatch: any, getState: Store) => {
    const { securityState } = getState();
    const { access_token } = securityState.user;
    services.saveTreatment(value, access_token).then(
      (response ) => {
        if (response) {
          const msg = `New Treatment added!`;
          console.log(response);
          dispatch(success(response));
          dispatch(openSnackBar(msg, 'success'));
        } else {
          const errorString = `Please Check the details you have provided!`;
          dispatch(openSnackBar(errorString, 'success'));
        }
      },
      (error: any) => {
        const errorString = `Cannot save Treatment!`;
        dispatch(openSnackBar(errorString, 'success'));
      }
    );
  };
  function success(response ) { return {
    type: constants.SAVE_TREATMENT_SUCCESS, payload: response
  }}
}

export function fetchTreatment() {
  return (dispatch , getState: Store) => {
    const { securityState } = getState();
    const { access_token } = securityState.user;

    dispatch(request());
    services.fetchTreatment(access_token)
      .then(
        (treatment) => {
          dispatch(success(treatment));
        },
        (error: any) => {
          dispatch(failure(error));
        }
      );
  };

  function request() { return { type: constants.FETCH_TREATMENT_REQUEST} }
  function success(treatment: Object ){
    return {
      type: constants.FETCH_TREATMENT_SUCCESS, treatment
    }
  }
  function failure(error) {
    return {
      type: constants.FETCH_TREATMENT_FAILURE , error
    }
  }
}

export function updateTreatmentMedicine(updateTreatment, id_treatment) {
  console.log("inside updateTreatmentMedicine");

  return (dispatch , getState: Store) => {
    dispatch({type: constants.UPDATE_TREATMENT_MEDICINE_REQUEST,
      payload: updateTreatment});
    const { securityState } = getState();
    const { access_token } = securityState.user;

    try {
      services.updateTreatmentMedicine(access_token, updateTreatment, id_treatment).then(
        (response ) => {
          dispatch(success(response));
          const msg ='Treatment is updated!';
          dispatch(openSnackBar(msg, 'success'));
        },
        (error: any) => {
          const errorString = `Cannot update this Treatment!`;
          dispatch(openSnackBar(errorString, 'success'));
        }
      );
    }catch (e) {
      console.log(e.stack);
    }
  };
  function success(response) { return {
    type: constants.UPDATE_TREATMENT_MEDICINE_SUCCESS,
    payload: response
  }}
}

export function updateMedicineFromTreatment(updateMedicineTreatment, id_treatment) {
  console.log("inside updateMedicineFromTreatment");
  return (dispatch , getState: Store) => {
    dispatch({type: constants.UPDATE_MEDICINE_FROM_TREATMENT_REQUEST,
      payload: updateMedicineTreatment});
    const { securityState } = getState();
    const { access_token } = securityState.user;
    services.updateMedicineFromTreatment(access_token, updateMedicineTreatment, id_treatment).then(
      (response ) => {
        dispatch(success(response));
      },
      (error: any) => {
        const errorString = `Cannot update this Medicine!`;
        dispatch(openSnackBar(errorString, 'success'));
      }
    );
  };
  function success(response) { return {
    type: constants.UPDATE_MEDICINE_FROM_TREATMENT_SUCCESS,
    payload: response
  }}
}

export function deleteMedicineFromTreatment(deleteMedicine, id_treatment) {
  console.log("inside deleteMedicineFromTreatment");
  return (dispatch , getState: Store) => {
    dispatch({type: constants.DELETE_MEDICINE_FROM_TREATMENT_REQUEST,
      payload: deleteMedicine});
    const { securityState } = getState();
    const { access_token } = securityState.user;
    services.deleteMedicineFromTreatment(access_token, deleteMedicine, id_treatment).then(
      (response ) => {
        dispatch(success(response));
      },
      (error: any) => {
        const errorString = `Cannot Delete This Medicine!`;
        dispatch(openSnackBar(errorString, 'success'));
      }
    );
  };
  function success(response) { return {
    type: constants.DELETE_MEDICINE_FROM_TREATMENT_SUCCESS,
    payload: response
  }}
}

export function deleteTreatment(id_treatment) {
  console.log("inside deleteTreatment");
  return (dispatch , getState: Store) => {
    dispatch({type: constants.DELETE_TREATMENT_REQUEST,
      payload: id_treatment});
    const { securityState } = getState();
    const { access_token } = securityState.user;
    services.deleteTreatment(access_token, id_treatment).then(
      (response ) => {
        dispatch(success(response));

        const msg ='Treatment Deleted!';
        dispatch(openSnackBar(msg, 'success'));
      },
      (error: any) => {
        const errorString = `Cannot Delete This Treatment!`;
        dispatch(openSnackBar(errorString, 'success'));
      }
    );
  };
  function success(response) { return {
    type: constants.DELETE_TREATMENT_SUCCESS,
    payload: response
  }}
}
