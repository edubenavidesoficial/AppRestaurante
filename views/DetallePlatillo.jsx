import React, {useContext} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text, NativeBaseProvider, Box, Button, Heading} from 'native-base';
import PedidosContext from '../context/pedidos/pedidosContext';
import globalStyles from '../styles/global';

const DetallePlatillo = () => {
  //trayendi platillo del context
  const {platillo} = useContext(PedidosContext);
  const {nombre, imagen, descripcion, precio} = platillo;
  //funcion para redireccionar
  const navigation = useNavigation();
  return (
    <NativeBaseProvider style={globalStyles.contenedor}>
      <View style={globalStyles.contenido}>
        <Heading style={globalStyles.titulo}>{nombre} </Heading>
        <Box border="1" borderRadius="md">
          <Image style={globalStyles.imagen} source={{uri: imagen}} />
          <Text style={{marginTop: 20}}>{descripcion} </Text>
          <Text style={globalStyles.cantidad}>Precio: $ {precio} </Text>
        </Box>
      </View>
      <View>
        <Button
          style={[globalStyles.boton]}
          onPress={() => navigation.navigate('FormularioPlatillo')}
        >
          <Text style={globalStyles.botonTexto}>Ordenar platillo</Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  titulo: {
    textTransform: 'uppercase',
    color: '#000',
  },
});

export default DetallePlatillo;
