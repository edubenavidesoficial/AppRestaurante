import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text, Heading, NativeBaseProvider, Button} from 'native-base';

import globalStyles from '../styles/global';
import PedidosContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const ProgresoPedido = () => {
  const navigation = useNavigation();

  const {idpedido} = useContext(PedidosContext);
  const [tiempo, guardarTiempo] = useState(0);
  const [completado, guardarCompletado] = useState(false);

  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection('ordenes')
        .doc(idpedido)
        .onSnapshot(function (doc) {
          guardarTiempo(doc.data().tiempoentrega);
          guardarCompletado(doc.data().completado);
        });
    };
    obtenerProducto();
  }, []);
  // Muestra el countdown en la pantalla
  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={styles.tiempo}>
        {minutes}:{seconds}{' '}
      </Text>
    );
  };

  return (
    <NativeBaseProvider style={globalStyles.contenedor}>
      <View style={[ {marginTop: 50}]}>
        {tiempo === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Hemos recibido tu orden...
            </Text>
            <Text style={{textAlign: 'center'}}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}

        {!completado && tiempo > 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Su orden estará lista en:{' '}
            </Text>
            
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            
          </>
        )}

        {completado && (
          <>
            <Heading style={styles.textoCompletado}>Orden Lista</Heading>
            <Text style={styles.textoCompletado}>
              Por favor, pase a recoger su pedido
            </Text>

            <Button
              style={[globalStyles.boton, {marginTop: 100}]}
              onPress={() => navigation.navigate('NuevaOrden')}
            >
              <Text style={globalStyles.botonTexto}>
                Comenzar Una Orden Nueva
              </Text>
            </Button>
          </>
        )}
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 40,
    paddingTop:50,
  },
  textoCompletado: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});

export default ProgresoPedido;
