import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions, Image } from "react-native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const LoginComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.loginContainer}>
            <LottieView
              source={require("../assets/loader.json")}
              autoPlay
              loop
              style={{ width: 300, height: 300 }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.loginContainer}>
          <Image
          style={styles.title}
            source={require("../assets/title.png")}
          ></Image>
        </View>

        <View style={styles.bottomSection}>
          <Link
            style={styles.roundedButton}
            href="components/TusCitasScreen"
            onPress={() => console.log("Botón Inicia sesion")}
          >
            <Text style={styles.welcomeMessage}>Iniciar sesión</Text>
          </Link>

          <Text style={[styles.welcomeMessage, styles.textNouser]}>
            ¿Aún no tienes cuenta?
          </Text>

          <Link
            href="components/signIn"
            style={styles.roundedButton}
            onPress={() => console.log("Botón Registrarse")}
          >
            <Text style={styles.welcomeMessage}>Registrate</Text>
          </Link>
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
  title: {
    flex: 1,
    width: 500,
    resizeMode: "contain", 
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
    textAlign: "center",
    backgroundColor: "rgba(7, 17, 109, 1)",
    borderRadius: 25,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    width:300,
    shadowOffset: { width: 0, height: 2 },
  },
  textNouser: {
    padding: 12,
  },
  loadingMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    color: "black",
  },
});

export default LoginComponent;
