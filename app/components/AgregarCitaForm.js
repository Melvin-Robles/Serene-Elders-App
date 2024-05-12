import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AgregarCitaForm = ({ onCancelar, onAgregar }) => {
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [razonCita, setRazonCita] = useState('');
  const [comentario, setComentario] = useState('');

  const handleAgregar = () => {
    // Validar datos antes de agregar
    if (!nombrePaciente || !fechaCita || !horaCita || !razonCita) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    
    // Enviar datos a la función de agregar
    onAgregar({
      nombrePaciente,
      fechaCita,
      horaCita,
      razonCita,
      comentario
    });
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.formTitle}>Agregar Cita</Text>
      <View style={styles.inputContainer}>
        <Text>Nombre del paciente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del paciente"
          value={nombrePaciente}
          onChangeText={setNombrePaciente}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Fecha de próxima cita:</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de próxima cita"
          value={fechaCita}
          onChangeText={setFechaCita}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Hora de la cita:</Text>
        <TextInput
          style={styles.input}
          placeholder="Hora de la cita"
          value={horaCita}
          onChangeText={setHoraCita}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Razón de la cita:</Text>
        <TextInput
          style={styles.input}
          placeholder="Razón de la cita"
          value={razonCita}
          onChangeText={setRazonCita}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Comentario:</Text>
        <TextInput
          style={[styles.input, styles.commentInput]}
          multiline
          placeholder="Comentario"
          value={comentario}
          onChangeText={setComentario}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancelar}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAgregar}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    width: '80%', // Ajusta el tamaño del modal
    borderRadius: 10, // Redondea las esquinas
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  commentInput: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row', // Coloca los botones en fila
    justifyContent: 'space-between', // Espacio uniforme entre los botones
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#87CEEB',
    padding: 10,
    borderRadius: 5,
    flex: 1, // Ocupa la mitad del espacio disponible
    marginRight: 5, // Margen derecho para separar los botones
  },
  addButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    flex: 1, // Ocupa la mitad del espacio disponible
    marginLeft: 5, // Margen izquierdo para separar los botones
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AgregarCitaForm;

