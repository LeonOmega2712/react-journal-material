import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initialState,
} from '../../fixtures/authFixtures';

describe('Pruebas en el authSlice', () => {
  test('debe de regresar el estado inicial y llamarse "auth"', () => {
    expect(authSlice.name).toBe('auth');
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('debe de realizar la autenticación', () => {
    
    const state = authSlice.reducer(initialState, login(demoUser));
    console.log(state);
    expect(state).toEqual({
      status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoUrl: demoUser.photoUrl,
      errorMessage: null,
    });
  });

  test('debe de realizar el logout sin argumentos', () => {
    // authenticatedState // logout sin argumentos
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoUrl: null,
      errorMessage: undefined,
    });
  });

  test('debe de realizar el logout y mostrar un mensaje de error', () => {
    // authenticatedState // logout con argumentos
    const errorMessage = 'Credenciales no son correctas';

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoUrl: null,
      errorMessage: errorMessage,
    });
  });

  test('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe('checking');
  });
});
