import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const NuevoDoctorForm = () => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}>Nombre:</Text>
      <TextInput style={styles.textInput} />

      <Text style={styles.formLabel}>Especialidad:</Text>
      <TextInput style={styles.textInput} />
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar Doctor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: '80%'
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addButton: {
    backgroundColor: '#00695c',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NuevoDoctorForm;