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

const { width } = Dimensions.get("window");

const login = () => {
  const [username, setUsername] = useState("");
  const [surname, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [celphone, setCelphone] = useState("");

  const handleLogin = () => {
    Alert.alert("Login Attempt", `Username: ${username} Password: ${password}`);
  };

  return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.title}>
          <Text style={styles.titleText}>Inicia sesión!</Text>

          <View style={styles.containerForm}>


              <TextInput
                style={styles.input}
                placeholder="Correo Electronico"
                value={email}
                onChangeText={setEmail}
                secureTextEntry
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.roundedButton}>
            <Link
              href="components/perfil"
              onPress={() => console.log("Peticion de registro")}
            >
              <Text style={styles.buttonText}>Inicia</Text>
            </Link>
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
    height: 100,
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

export default login;
