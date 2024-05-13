import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';



const { width } = Dimensions.get("window");

function SigIn() {

  const navigation = useNavigation();


  const [userName, setUsername] = useState("");
  const [surname, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [celphone, setCelphone] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const db = getFirestore();
        const userRef = doc(db, "users", userCredential.user.uid);
        setDoc(userRef, {
          email: email,
          name: userName,
          surname: surname,
          celphone: celphone,
          createdAt: new Date(),
          rol: null,
        })
          .then(async() => {
            Alert.alert("Usuario registrado");

            const db = getFirestore();
            const userRef = doc(db, "users", userCredential.user.uid);
            try {
              const docSnap = await getDoc(userRef);
              if (docSnap.exists()) {
                const userInfo = await docSnap.data()
                console.log(docSnap.data(), "docSnap");
                await AsyncStorage.setItem("@userInfo",  JSON.stringify(userInfo));
    
              } 
            } catch (error) {
              Alert.alert("Error al obtener datos del usuario: " + error.message);
            }

            navigation.navigate('components/home')
            setIsLoading(false);
          })
          .catch((error) => {
            Alert.alert(
              "Error" + error.message
            );
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        Alert.alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/background.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.title}>
            <View style={styles.containerForm}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={userName}
                onChangeText={(text) => {
                  const formattedText = text.replace(/[^a-zA-Z\s]/g, "");
                  setUsername(formattedText);
                }}
                autoCapitalize="words"
              />

              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={surname}
                onChangeText={(text) => {
                  const formattedText = text.replace(/[^a-zA-Z\s]/g, "");
                  setSurName(formattedText);
                }}
                autoCapitalize="words"
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
                onChangeText={(text) => {
                  const formattedText = text.replace(/[^0-9]/g, "").slice(0, 8);
                  setCelphone(formattedText);
                }}
                keyboardType="number-pad"
                maxLength={8}
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
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <TouchableOpacity
                onPress={handleCreateAccount}
                style={styles.roundedButton}
              >
                <Text style={styles.buttonText}>Registrarme</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
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
    height: 50,
    marginBottom: 10,
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

export default SigIn
