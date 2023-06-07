import React, {useReducer} from 'react';
import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import {OBTENER_PRODUCTOS} from '../../types';
import _ from 'lodash';

const FirebaseState = props => {
  //state inicial
  const initialState = {
    menu: [],
  };
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  //funcion para traer los productos

  const obtenerProductos = () => {
    //CONSULTAR FIREBASE
    firebase.db.settings({experimentalForceLongPolling: true, merge: true});
    firebase.db
      .collection('productos')
      .where('existencia', '==', true)
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platillos = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      platillos = Array.from(
        platillos.reduce(
          (m, {categoria, ...data}) =>
            m.set(categoria, [...(m.get(categoria) || []), data]),
          new Map(),
        ),
        ([categoria, data]) => ({categoria, data}),
      );
      // platillos = _.sortBy(platillos,'categoria')

      dispatch({
        type: OBTENER_PRODUCTOS,
        payload: platillos,
      });
    }
  };
  return (
    <FirebaseContext.Provider
      value={{menu: state.menu, firebase, obtenerProductos}}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
