import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TusCitasScreen = () => {
  // Datos de ejemplo
  const proximasCitas = [
    { paciente: "Juan Perez", hora: "10:00 AM" },
    { paciente: "Maria Gomez", hora: "11:30 AM" },
  ];

  const citasRecientes = [
    { paciente: "Carlos Ramirez", hora: "09:15 AM" },
    { paciente: "Ana Martinez", hora: "01:45 PM" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tus citas</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Agregar cita</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Mis próximas citas</Text>
        {proximasCitas.map((cita, index) => (
          <View key={index} style={styles.citaContainer}>
            <View style={styles.initialsCircle}>
              <Text style={styles.initialsText}>{cita.paciente.charAt(0)}</Text>
            </View>
            <View style={styles.citaDetails}>
              <Text style={styles.pacienteText}>{cita.paciente}</Text>
              <Text style={styles.horaText}>{cita.hora}</Text>
            </View>
            <Text style={styles.linkText}>Editar | Eliminar</Text>
          </View>
        ))}
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Citas creadas recientemente</Text>
        {citasRecientes.map((cita, index) => (
          <View key={index} style={styles.citaContainer}>
            <View style={styles.initialsCircle}>
              <Text style={styles.initialsText}>{cita.paciente.charAt(0)}</Text>
            </View>
            <View style={styles.citaDetails}>
              <Text style={styles.pacienteText}>{cita.paciente}</Text>
              <Text style={styles.horaText}>{cita.hora}</Text>
            </View>
            <Text style={styles.linkText}>Editar | Eliminar</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#87CEFA', // Celeste
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Texto blanco
  },
  addButton: {
    backgroundColor: 'transparent', // Botón transparente
    borderWidth: 1, // Borde
    borderStyle: 'dashed', // Estilo de línea discontinua
    borderColor: '#000000', // Color del borde
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#000000', // Texto en negro
    fontWeight: 'bold',
  },
  linkText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  citaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  initialsCircle: {
    backgroundColor: '#87CEFA',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initialsText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  citaDetails: {
    flex: 1,
  },
  pacienteText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  horaText: {
    fontSize: 14,
  },
});

export default TusCitasScreen;

