import { StyleSheet, Text, View } from "react-native";
import React, {  useState } from "react";
import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { getFirestore, doc, getDoc  } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';



const { width } = Dimensions.get("window");

const Login = () => {

  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = () => {
        

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => { 
        console.log('Signed in!');
        const user = userCredential.user;
        console.log(user);
  
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            console.log("Datos del usuario:", docSnap.data());
            const userInfo = await docSnap.data()
            await AsyncStorage.setItem("@userInfo",  JSON.stringify(userInfo));
          } 
        } catch (error) {
          Alert.alert("Error al obtener datos del usuario: " + error.message);
        }
        
        navigation.navigate('components/home')
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert(
         error.message
        );
      });
  }
  



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

export default Login