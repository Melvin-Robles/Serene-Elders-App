import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config';

const { width } = Dimensions.get("window");

const sigIn = () => {
  const [username, setUsername] = useState("");
  const [surname, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [celphone, setCelphone] = useState("");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  const handleCreateAccount = () => {
    console.log('Account created!')
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }


  const handleLogin = () => {
    Alert.alert("Login Attempt", `Username: ${username} Password: ${email}`);
  };

  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/background.png")}
            style={styles.backgroundImage}
          >
            <View style={styles.title}>
              <Text style={styles.titleText}>Registro de datos!</Text>
  
              <View style={styles.containerForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Apellido"
                  value={surname}
                  onChangeText={setSurName}
                  autoCapitalize="none"
                />
  
                <TextInput
                  style={styles.input}
                  placeholder="Correo Electronico"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
  
                <TextInput
                  style={styles.input}
                  placeholder="Celular"
                  value={celphone}
                  onChangeText={setCelphone}
                  autoCapitalize="none"
                />
  
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={password}
                  secureTextEntry
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
              </View>
            </View>
  
        <View style={styles.bottomSection}>
              <TouchableOpacity onPress={handleCreateAccount} style={styles.roundedButton}>
       
                  <Text style={styles.buttonText}>Registrarme</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 0,
  },
  backgroundImage: {
    width: width,
    resizeMode: "cover",
    flex: 1,
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 36,
    color: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  bottomSection: {
    width: width,
    height: 50,
    marginBottom:10,
    justifyContent: "center",
    alignItems: "center",
  },
  roundedButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: "rgba(7, 17, 109, 1)",
    borderRadius: 25,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    height: 40,
    borderRadius: 25,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  containerForm: {
    width: 300,
    marginTop: 20,
    padding: 10,
  },
});

export default sigIn;
