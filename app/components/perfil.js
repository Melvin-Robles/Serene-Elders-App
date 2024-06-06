import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Image } from 'react-native';

const Perfil = () => {
  const [nombre, setNombre] = useState('Alex');
  const [apellido, setApellido] = useState('Siguenza');
  const [email, setEmail] = useState('alexsiguenza@gmail.com');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/drs.png')} style={styles.profileImage} />
        <Text style={styles.greeting}>¡Hola!</Text>
        <Text style={styles.name}>Dr. {nombre} {apellido}</Text>
        <Text style={styles.subtitle}>Doctor/a</Text>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNombre}
            value={nombre}
            placeholder="Ingrese su nombre"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            onChangeText={setApellido}
            value={apellido}
            placeholder="Ingrese su apellido"
          />
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Ingrese su correo electrónico"
          keyboardType="email-address"
        />
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
