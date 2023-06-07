import React, {useReducer} from 'react';

import PedidosReducer from './pedidosReducer';
import PedidosContext from './pedidosContext';
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PLATILLO,
  MOSTRAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO
} from '../../types';

const PedidoState = props => {
  //state inicial
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
   idpedido: '',
  };
  const [state, dispatch] = useReducer(PedidosReducer, initialState);

  //Selecciona el producto que el usuario quiera
  const seleccionarPlatillo = platillo => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo,
    });
  };

  //CUANDO SE CREA UN PEDIDO
  const guardarPedido = pedido => {
    //Para que se vaya acumulando
    const product = state.pedido.find(articulo => articulo.id === pedido.id);
    if (product) {
      product.cantidad = parseInt(product.cantidad) + parseInt(pedido.cantidad);
      product.total = product.total + pedido.total;
    } else {
      dispatch({
        type: CONFIRMAR_ORDENAR_PLATILLO,
        payload: pedido,
      });
    }
  };
  //Mostrar el total pagar
  const mostrarResumen = total => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total,
    });
  };

  //elimar articulo
  const eliminarProducto = id => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };

   const pedidoRealizado = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

  return (
    <PedidosContext.Provider
      value={{
        pedido: state.pedido,
        total: state.total,
        idpedido: state.idpedido,
        platillo: state.platillo,
        seleccionarPlatillo,
        guardarPedido,
        mostrarResumen,
        eliminarProducto,
        pedidoRealizado,
      }}
    >
      {props.children}
    </PedidosContext.Provider>
  );
};

export default PedidoState;
