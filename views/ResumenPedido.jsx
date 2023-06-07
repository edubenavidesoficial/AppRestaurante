import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  Heading,
  HStack,
  FormControl,
  NativeBaseProvider,
  Box,
  Button,
  Input,
  Avatar,
  VStack,
} from 'native-base';

import globalStyles from '../styles/global';
import PedidosContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';

const ResumenPedido = () => {
  const {pedido, total, mostrarResumen,eliminarProducto,pedidoRealizado} = useContext(PedidosContext);

  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
    );
    mostrarResumen(nuevoTotal);
  };
  //Funcion para confirmar  y redireccioanr
  const navigation = useNavigation();

  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realizas tu pedido,no podrás cambiarlo',
      [
        {
          text: 'Confirmar',
          onPress:  async () => {
            const pedidoObj ={
              tiempoentrega:0,
              completado:false,
              total: Number(total),
              orden: pedido,
              creado: Date.now()
            }
            try {
              const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
               pedidoRealizado(pedido.id);
            } catch (error) {
              console.log(error)
            }
            navigation.navigate('ProgresoPedido');
          },
        },
        {text: 'Revisar', style: 'cancel'},
      ],
    );
  };
  const confirmarEliminacion = id => {
    Alert.alert(
      '¿Esta seguro de elimianr el articulo?',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            eliminarProducto(id);
          },
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };
  

  return (
    
    
    <NativeBaseProvider style={globalStyles.contenedor}>
      
      <ScrollView>
        <View style={[styles.scroll, globalStyles.contenido]}>
          <Heading style={globalStyles.titulo}>Resumen Pedido</Heading>
          {pedido.map((platillo, i) => {
            const {cantidad, nombre, imagen, id, precio} = platillo;
            return (
              <View key={id + i} style={styles.tarjeta}>
                <HStack  space={[6, 3]}  >
                  <Box>
                    <Avatar size="130px" source={{uri: imagen}}></Avatar>
                  </Box>
                  <VStack>
                    <Text>{nombre} </Text>
                    <Text>cantidad:{cantidad} </Text>
                    <Text>Precio: $ {precio} </Text>
                    <Button
                      size={'lg'}
                      onPress={() => confirmarEliminacion(id)}
                      style={{backgroundColor: 'red', marginTop: 10}}
                      full
                    >
                      <Text style={{color: '#fff', paddingHorizontal: 62}}>
                        Eliminar
                      </Text>
                    </Button>
                  </VStack>
                </HStack>
              </View>
            );
          })}

          <Text style={[globalStyles.cantidad, styles.titulo]}>
            Total a Pagar: $ {total}
          </Text>
          <Button
            style={styles.boton}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.textob}>Seguir Pidiendo</Text>
          </Button>
        </View>
      </ScrollView>
      <View>
        <Button onPress={() => progresoPedido()} 
         style={globalStyles.boton}>
          <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    marginHorizontal: 15,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },
  titulo: {
    textAlign: 'center',
  },
  scroll: {
    marginBottom: 40,
  },
  boton: {
    backgroundColor: '#000',
    marginTop: 20,
  },
  textob: {
    color: '#fff',
    textTransform: 'uppercase',
  },
  bteliminar: {
    flex: 1,
  },
});

export default ResumenPedido;
