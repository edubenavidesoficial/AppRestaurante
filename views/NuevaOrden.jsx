import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, NativeBaseProvider} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const NuevaOrden = () => {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <View style={[globalStyles.contenedor]}>
        <View style={[globalStyles.contenido, styles.contenido]}>
          <Button
            style={globalStyles.boton}
            onPress={() => navigation.navigate('Menu')}
            borderRadius="full"
          >
            <Text style={globalStyles.botonTexto}>Nueva orden</Text>
          </Button>
        </View>
      </View>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default NuevaOrden;
