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

import firebase from "../../database/firebase";
import { QuerySnapshot } from "firebase/firestore";
import {ListItem, Avatar} from 'react-native-elements'

const { width } = Dimensions.get("window");

const Separator = () => <View style={styles.separator} />;


const pacientesComponent = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  return (
    <View style={styles.contenedor}>

      <Text style={styles.subHeader}><Image source={require('../../icons/pacientes.png') }
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
