import { doc, setDoc } from 'firebase/firestore/lite';
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/providers';
import { checkingCredentials, login, logout } from './';
import { FirebaseDB } from '../../firebase/config';
import { setSaving, updateNote } from '../journal';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }
    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({ email, password, displayName });

    if (!ok) {
      return dispatch(logout({ errorMessage }));
    }

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    console.log(result);
    if (!result.ok) {
      return dispatch(logout(result));
    }

    dispatch(login(result));
    console.log(result);
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout());
  };
};

export const startSaveNote = () => {
  return async(dispatch, getState) => {

    dispatch(setSaving());

    const {uid} = getState().auth;
    const {active: note} = getState().journal;

    const noteToFirestore = {...note};
    delete noteToFirestore.id;

    const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true} );

    dispatch(updateNote(note));
  }
}