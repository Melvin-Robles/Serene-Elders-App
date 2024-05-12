import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, Dimensions, Image, Button, TouchableOpacity, Platform } from "react-native";
import LottieView from "lottie-react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width } = Dimensions.get("window");
WebBrowser.maybeCompleteAuthSession();

const LoginComponent = () => {

/* AUTH */

const [token, setToken] = useState("");
const [userInfo, setUserInfo] = useState(null);

const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: "852491587122-rvfefelt1n45l3hsool150diaj31f45c.apps.googleusercontent.com",
  webClientId: "852491587122-760acgiho0lj7nb4gjnllvb6e6naaqss.apps.googleusercontent.com",
});

useEffect(() => {
  handleEffect();
}, [response, token]);

async function handleEffect() {
  const user = await getLocalUser();
  if (!user) {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo(response.authentication.accessToken);
    }
  } else {
    setUserInfo(user);
    console.log(user);
    console.log("loaded locally");
  }
}

const getLocalUser = async () => {
  const data = await AsyncStorage.getItem("@user");
  if (!data) return null;
  return JSON.parse(data);
};

const getUserInfo = async (token) => {
  if (!token) return;
  try {
    const response = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const user = await response.json();
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    setUserInfo(user);
  } catch (error) {
  }
};

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
          {Platform.OS === 'web' ? (
        <View>
                 <Image
          style={styles.title}
            source={require("../assets/splash.png")}
          ></Image>
        </View>
      ) : (
        <View>
          <LottieView
              source={require("../assets/loader.json")}
              autoPlay
              loop
              style={{ width: 300, height: 300 }}
            />  
                
        </View>
      )}


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
            href="components/login"
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

          <TouchableOpacity
        style={[styles.roundedButton, styles.textMargin]}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text style={[styles.welcomeMessage, styles.textNouser]}>Inicia con Google!</Text>
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
    textAlign:"center"
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
  textMargin: {
    margin: 5,
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
