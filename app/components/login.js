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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Home from "./home";
import AsyncStorage from "@react-native-async-storage/async-storage";



const { width } = Dimensions.get("window");

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in!')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
    })
  }



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
        {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <TouchableOpacity
                onPress={handleSignIn}
                style={styles.roundedButton}
              >
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
            )}
        </View>
      </ImageBackground>
    </View>
    </KeyboardAvoidingView>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="logIn">
        <Stack.Screen name="Registrate!" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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

