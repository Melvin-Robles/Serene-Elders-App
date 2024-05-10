import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button, TextInput, ScrollView, Alert
} from "react-native";

import * as Font from "expo-font";

import firebase from "../../database/firebase";

const { width } = Dimensions.get("window");

const registrarPacientesComponent = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      "roboto-medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    });

    setFontsLoaded(true);
  };

  const [state, setSate] = useState({
    nombres: "",
    apellidos: "",
    telefono1:"",
    telefono2: "",
    correo: "",
    direccion: "",
  });

  const cambiosDeTexto = (name, value) => {
    setSate({...state, [name]: value})
  }

  const crearPaciente = async () => {
    
    if (state.nombres === "") {
      alert("Debe de ingresar su nombre");
    }else if (state.apellidos === "") {
      alert("Debe de ingresar su apellido");
    }else if (state.telefono1 === "") {
      alert("Debe de ingresar un teléfono de contacto");
    }else if (state.correo === "") {
      alert("Debe de ingresar su correo");
    }else if (state.direccion === "") {
      alert("Debe de ingresar su dirección");
    }else{
      try{
        await firebase.db.collection('pacientes').add({
          nombres: state.nombres,
          apellidos: state.apellidos,
          telefono1: state.telefono1,
          telefono2: state.telefono2,
          correo: state.correo,
          direccion: state.direccion,
        })
        alert("¡Registro existoso!");
        console.log(state);
      }catch(error){
        alert('ERROR: Ocurrio un error al realizar el ingreso.');
        console.log(error);
      }
    }
    
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Crear nuevo paciente</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Nombres</Text>
        <TextInput onChangeText={(value) => cambiosDeTexto('nombres', value)} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Apellidos</Text>
        <TextInput onChangeText={(value) => cambiosDeTexto('apellidos', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Números de contacto</Text>
        <TextInput placeholder="Teléfono 1" onChangeText={(value) => cambiosDeTexto('telefono1', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Teléfono 2" onChangeText={(value) => cambiosDeTexto('telefono2', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Correo electrónico</Text>
        <TextInput placeholder="ejemplo@gmail.com" onChangeText={(value) => cambiosDeTexto('correo', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Dirección</Text>
        <TextInput onChangeText={(value) => cambiosDeTexto('direccion', value)}/>
      </View>
      <View style={styles.fixToText}>
        <TouchableOpacity style={styles.botonCancelar} onPress={() => console.log(state)}>
          <Text style={styles.textoBoton}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonIngresar} onPress={() => crearPaciente()}>
          <Text style={styles.textoBoton}>¡Hecho!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 40,
    paddingBottom: 30,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  container: {
    flex: 1,
    padding: 15,
  },
  textos: {
    paddingBottom: 5
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonCancelar:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#07116D',
    borderRadius: 23, 
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, 
    shadowOpacity: 0.3, 
    shadowRadius: 3,
    width: 125, height: 50
  },
  botonIngresar:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E4A01A',
    borderRadius: 23, 
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, 
    shadowOpacity: 0.3, 
    shadowRadius: 3,
    width: 125, height: 50 
  },
  textoBoton: {
    color: "white",
  }
});

export default registrarPacientesComponent;
