import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";

const { width } = Dimensions.get("window");

const LoginComponent = () => {
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.welcomeMessage}>¡Bienvenido test desde una rama!</Text>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => console.log("Botón Inicia sesion")}
          >
            <Text style={styles.welcomeMessage}>Iniciar sesión</Text>
          </TouchableOpacity>

          <Text style={[styles.welcomeMessage, styles.textNouser]}>
            ¿Aún no tienes cuenta?
          </Text>

          <TouchableOpacity
            style={styles.roundedButton}
            onPress={() => console.log("Botón Registrarse")}
          >
            <Text style={styles.welcomeMessage}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  welcomeMessage: {
    color: "white",
    fontFamily: "roboto-medium",
  },
  bottomSection: {
    width: width,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  roundedButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(7, 17, 109, 1)",
    borderRadius: 25, 
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, 
    shadowOpacity: 0.3, 
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  textNouser: {
    padding: 12,
  },
});

export default LoginComponent;
