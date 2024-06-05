import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform  } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';



const AgregarCitaForm = ({ onCancelar, onAgregar }) => {
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [razonCita, setRazonCita] = useState('');
  const [comentario, setComentario] = useState('');

  const handleAgregar = () => {
    // Validar datos antes de agregar
    if (!selectedPatient || !fechaCita || !horaCita || !razonCita) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    
    // Enviar datos a la función de agregar
    onAgregar({
      selectedPatient,
      fechaCita,
      horaCita,
      razonCita,
      comentario
    });
  };


  /* Formulario */

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  /* Peticiones */

  const fetchPatients = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const currentUserId = currentUser ? currentUser.uid : null;
  
    const q = query(collection(db, "users"), where("rol", "==", "PATIENT"));
    const querySnapshot = await getDocs(q);
    const patients = [];
    querySnapshot.forEach((doc) => {
      if(doc.id !== currentUserId) {
        patients.push({ id: doc.id, ...doc.data() });
      }
    });
    return patients;
  };

  /* Querys */



  useEffect(() => {
    const getPatients = async () => {
      const patients = await fetchPatients();
      setPatientsData(patients);
    };

    getPatients();
  }, []);

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.formTitle}>Agregar Cita</Text>
      <View style={styles.inputContainer}>
      <Text> Paciente:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedPatient(value)}
          items={patientsData.map(patient => ({
            label: patient.name + " " + patient.surname, 
            value: patient.id, 
          }))}
          style={pickerSelectStyles}
          placeholder={{
            label: 'Selecciona un paciente...',
            value: null,
          }}
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

const pickerSelectStyles = StyleSheet.create({

  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, 
  },
});


export default AgregarCitaForm;

