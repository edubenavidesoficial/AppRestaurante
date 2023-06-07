import React, {useContext, useEffect} from 'react';
import {Button, NativeBaseProvider, Text} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import PedidosContext from '../context/pedidos/pedidosContext';

const BotonResumen = () => {
  const navigation = useNavigation();
  const {pedido} = useContext(PedidosContext);
  if (pedido.length === 0) return null;

  return (
    <NativeBaseProvider>
      <Button
        onPress={() => navigation.navigate('ResumenPedido')}
        style={globalStyles.boton}
      >
        <Text style={globalStyles.botonTexto}>Ir a Pedido</Text>
      </Button>
    </NativeBaseProvider>
  );
};

export default BotonResumen;
