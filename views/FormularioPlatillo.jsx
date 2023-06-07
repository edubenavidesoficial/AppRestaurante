import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
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
} from 'native-base';
import globalStyles from '../styles/global';
import PedidosContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {
  const [cantidad, setCantidad] = useState('1');
  const [total, setTotal] = useState(0);

  //context
  const {platillo, guardarPedido} = useContext(PedidosContext);
  const {precio} = platillo;
  const navigation = useNavigation();

  //Cuando el componente este cargado
  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  //Calcular el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setTotal(totalPagar);
  };

  //incrementa en 1 el boton
  const incrementar = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setCantidad(nuevaCantidad.toString());
  };
  //decrementar la cantidad
  const decrementar = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(nuevaCantidad.toString());
    }
  };
  //condirmar la orden
  const confirmarOrden = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido?',
      'Un pedido confirmado no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //alamacenar el pedido
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };
            guardarPedido(pedido);
            //navegar al resuemen del pedido
            navigation.navigate('ResumenPedido');
          },
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  return (
    <NativeBaseProvider style={globalStyles.contenedor}>
      <View style={globalStyles.contenido}>
        <Heading style={globalStyles.titulo}>Cantidad</Heading>
        <HStack justifyContent="space-around">
          <Button
            onPress={() => decrementar()}
            style={{backgroundColor: '#000', justifyContent: 'center'}}
            size={70}
          >
            -
          </Button>
          <Input
            style={{textAlign: 'center', fontSize: 20, color: '#000'}}
            w="40%"
            variant="unstyled"
            value={cantidad}
            keyboardType="numeric"
            onChangeText={cantidad => setCantidad(cantidad.toString())}
          />
          <Button
            onPress={() => incrementar()}
            style={{backgroundColor: '#000'}}
            size={70}
          >
            +
          </Button>
        </HStack>
        <Text style={[globalStyles.cantidad, styles.titulo]}>
          SubTotal: ${total}{' '}
        </Text>
      </View>
      <View style={styles.foo}>
        <Button style={globalStyles.boton} onPress={() => confirmarOrden()}>
          <Text style={globalStyles.botonTexto}> Agregar al Pedido</Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
  },
});

export default FormularioPlatillo;
