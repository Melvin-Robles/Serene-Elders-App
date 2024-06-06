import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Perfil = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  const guardarPerfil = () => {
    console.log('Perfil guardado:', { nombre, apellido, email, telefono, especialidad });
  };

  const modificarPerfil = () => {
    console.log('Perfil modificado:', { nombre, apellido, email, telefono, especialidad });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNombre}
        value={nombre}
        placeholder="Ingrese su nombre"
      />
      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setApellido}
        value={apellido}
        placeholder="Ingrese su apellido"
      />
      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Ingrese su correo electrónico"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTelefono}
        value={telefono}
        placeholder="Ingrese su número de teléfono"
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Especialidad en:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEspecialidad}
        value={especialidad}
        placeholder="Ingrese su especialidad"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={guardarPerfil}
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={modificarPerfil}
      >
        <Text style={styles.buttonText}>Modificar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Perfil;
