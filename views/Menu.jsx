import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidosContext from '../context/pedidos/pedidosContext';
import {
  NativeBaseProvider,
  Box,
  Text,
  HStack,
  VStack,
  Spacer,
  Avatar,
  SectionList,
} from 'native-base';

import globalStyles from '../styles/global';

const Menu = () => {
  //context de firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);
  const {seleccionarPlatillo} = useContext(PedidosContext);

  //funcion para redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
    // eslint-disable-next-line
  }, []);
  return (
    <NativeBaseProvider style={globalStyles.contenedor}>
      <SectionList
        w="94%"
        mx={3}
        sections={menu}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          const {imagen, nombre, descripcion, categoria, precio, id} = item;
          return (
            <Pressable
              onPress={() => {
                const {existencia, ...item2} = item;
                seleccionarPlatillo(item2);
                navigation.navigate('DetallePlatillo');
              }}
            >
              <Box
                ml="2"
                mr="2"
                borderBottomWidth="1"
                _dark={{borderColor: 'muted.50'}}
                borderColor="muted.800"
                pl={['0', '4']}
                pr={['0', '5']}
                py="2"
              >
                <HStack
                  space={[4, 3]} //espacio entre el avatar y el texto nombre
                  // justifyContent="space-between"
                >
                  <Avatar size="80px" source={{uri: imagen}}></Avatar>
                  <VStack>
                    <Text
                      _dark={{color: 'warmGray.50'}}
                      color="coolGray.800"
                      bold
                      fontSize="sm"
                    >
                      {nombre}
                    </Text>

                    <Text  color="coolGray.600" _dark={{color: 'warmGray.200'}}>
                      {descripcion}
                    </Text>
  
                  <Text
                    fontSize="xs"
                    // mr="3"
                    // mt="3"
                    _dark={{color: 'warmGray.50'}}
                    color="coolGray.800"
                    // alignSelf="flex-start"
                  >
                    ${precio}
                  </Text>
                  </VStack>
                  
                </HStack>
              </Box>
            </Pressable>
          );
        }}
        renderSectionHeader={({section: {categoria}}) => (
          <Box style={styles.separador} pb="3" pt="3">
            <Text style={styles.separadorTexto}> {categoria}</Text>
          </Box>
        )}
      />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000',
    marginTop: 6,
    marginBottom: 4,
    paddingHorizontal: 4,
    paddingRight: 4,
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Menu;
