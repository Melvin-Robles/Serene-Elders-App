import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Perfil = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [rol, setRol] = useState("");


  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@userInfo");
    const dataParsed = JSON.parse(data);
    if (dataParsed) {
      setName(dataParsed.name);
      setSurname(dataParsed.surname);
      setRol(dataParsed.rol);
      setEmail(dataParsed.email);
      setPhone(dataParsed.celphone);
    }
  };

  useEffect(() => {
    getLocalUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/drs.png')} style={styles.profileImage} />
        <Text style={styles.greeting}>¡Hola!</Text>
        <Text style={styles.name}> {rol == "DOCTOR" ? "Dr." : "Paciente"} {name} {surname}</Text>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={{fontWeight:'bold'}}>{name}</Text>
          
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellido</Text>
          <Text style={{fontWeight:'bold'}}>{surname}</Text>
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <Text style={{fontWeight:'bold'}}>{email}</Text>
        <Text style={{marginTop:'10'}}></Text>
        <Text style={styles.label}>Celular</Text>
        <Text style={{fontWeight:'bold'}}>{phone}</Text>
        
        
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formGroup: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Perfil;