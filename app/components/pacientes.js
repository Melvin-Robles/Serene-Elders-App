import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button, TextInput, ScrollView, Alert,  StatusBar,
  SafeAreaView,Image
} from "react-native";
import * as Font from "expo-font";

/*import firebase from "../../database/firebase";
import { QuerySnapshot } from "firebase/firestore";*/
import {ListItem, Avatar} from 'react-native-elements'



const { width } = Dimensions.get("window");

const pacientesComponent = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const users = [
    {
      id: 1,
      nombres: "Juan",
      apellidos: "Pérez",
      telefono1: "34567890",
      telefono2: "87654321",
      correo: "juan.perez@example.com",
      direccion: "123 Calle Principal, Ciudad, País"
    },
    {
      id: 2,
      nombres: "María",
      apellidos: "Gómez",
      telefono1: "34567891",
      telefono2: "87654322",
      correo: "maria.gomez@example.com",
      direccion: "456 Avenida Secundaria, Ciudad, País"
    },
    {
      id: 3,
      nombres: "Carlos",
      apellidos: "Sánchez",
      telefono1: "34567892",
      telefono2: "87654323",
      correo: "carlos.sanchez@example.com",
      direccion: "789 Calle Terciaria, Ciudad, País"
    },
    {
      id: 4,
      nombres: "Ana",
      apellidos: "Martínez",
      telefono1: "34567893",
      telefono2: "87654324",
      correo: "ana.martinez@example.com",
      direccion: "101 Calle Cuarta, Ciudad, País"
    },
    {
      id: 5,
      nombres: "Luis",
      apellidos: "Rodríguez",
      telefono1: "34567894",
      telefono2: "47654325",
      correo: "luis.rodriguez@example.com",
      direccion: "202 Calle Quinta, Ciudad, País"
    },
    {
      id: 6,
      nombres: "Elena",
      apellidos: "Fernández",
      telefono1: "34567895",
      telefono2: "87654326",
      correo: "elena.fernandez@example.com",
      direccion: "303 Calle Sexta, Ciudad, País"
    },
    {
      id: 7,
      nombres: "Miguel",
      apellidos: "García",
      telefono1: "34567896",
      telefono2: "87654327",
      correo: "miguel.garcia@example.com",
      direccion: "404 Calle Séptima, Ciudad, País"
    },
    {
      id: 8,
      nombres: "Lucía",
      apellidos: "Hernández",
      telefono1: "34567897",
      telefono2: "87654328",
      correo: "lucia.hernandez@example.com",
      direccion: "505 Calle Octava, Ciudad, País"
    },
    {
      id: 9,
      nombres: "Diego",
      apellidos: "López",
      telefono1: "34567898",
      telefono2: "87654329",
      correo: "diego.lopez@example.com",
      direccion: "606 Calle Novena, Ciudad, País"
    },
    {
      id: 10,
      nombres: "Sofía",
      apellidos: "Ruiz",
      telefono1: "34567899",
      telefono2: "87654330",
      correo: "sofia.ruiz@example.com",
      direccion: "707 Calle Décima, Ciudad, País"
    }
  ];
  
/*
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection('pacientes').orderBy('nombres').onSnapshot(QuerySnapshot =>{
      const users = [];
      QuerySnapshot.docs.forEach(doc =>{
        const {nombres, apellidos, telefono1, telefono2, correo, direccion} = doc.data()
        users.push({
          id: doc.id,
          nombres,
          apellidos,
          telefono1,
          telefono2,
          correo,
          direccion,
        })
      });

      setUsers(users);
    });

  }, []);
*/
  return (
    <View style={styles.contenedor}>

      <Text style={styles.subHeader}><Image source={require('../../icons/paciente.png') }
        style={{width: 40, height: 40}} />
      Pacientes</Text>
    
      <ScrollView >
        
        <TouchableOpacity style={styles.botonIngresar} >
          <Text style={styles.textoBoton}>Agregar nuevo paciente +</Text>
        </TouchableOpacity>

        {         
          users.map(user =>{
            return (
              <ListItem bottomDivider 
                key={user.id}
              >
                <ListItem.Chevron />
                <Avatar source={require('../../icons/avatar.png')}/>
                <ListItem.Content>
                  <ListItem.Title>
                    {user.nombres} {user.apellidos} 
                  </ListItem.Title>
                  <ListItem.Subtitle>
                  {user.correo}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                  <TouchableOpacity  ><Text style={styles.verCitas}>Ver citas</Text></TouchableOpacity>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )
          })
        }
        
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  botonIngresar:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 23, 
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, 
    shadowOpacity: 0.3, 
    shadowRadius: 3,
    width: 250, height: 50 ,
  },
  subHeader: {
    backgroundColor : "#8D16AB",
    color : "white",
    paddingVertical : 5,
    paddingHorizontal : 10,
    paddingBottom : 20,
    marginTop: 20,
    marginBottom : 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  verCitas:{
    fontSize: 17,
    color: 'grey',
  },
});

export default pacientesComponent;