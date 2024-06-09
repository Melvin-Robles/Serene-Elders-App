import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList,  ActivityIndicator } from 'react-native';
import AgregarCitaForm from './AgregarCitaForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection, collectionGroup, addDoc, getDoc, getDocs, query, where } from 'firebase/firestore'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';




const TusCitasScreen = () => {

  const db = getFirestore();
const auth = getAuth();
const navigation = useNavigation();
const [name, setName] = useState('');
const [surname, setSurname] = useState('');
const [rol, setRol] = useState('');
const [appointments, setAppointments] = useState([]);
const [appointmentsUser, setAppointmentsUser] = useState([]);
const [isLoading, setIsLoading] = useState(false);


  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        AsyncStorage.setItem("@userLogged",  JSON.stringify(currentUser));
      } 
    });

    return () => unsubscribe();
  }, []);

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@userInfo");
    const dataParsed =  JSON.parse(data)
    if (dataParsed) {
      setName(dataParsed.name);      
      setSurname(dataParsed.surname); 
      setRol(dataParsed.rol); 
    }
  };

  useEffect(() => {
    getLocalUser();
  }, []);
  

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const agregarCita = (nuevaCita) => {
    
    addAppointment(nuevaCita);
  };


  const addAppointment = async (newAppointment) => {
    const { comentario, fechaCita, razonCita, selectedPatient } = newAppointment;
  
    try {
      
    const userInfo = await AsyncStorage.getItem('@userLogged');
    const user = userInfo ? JSON.parse(userInfo) : null;

    if (!user || !user.uid) {
      throw new Error('User information is not available');
    }

    const doctorId = user.uid;


    
    const userDocRef = doc(db, 'users', selectedPatient);
    const appointmentsColRef = collection(userDocRef, 'appointments');
    const patientDocSnap = await getDoc(userDocRef);

    const patientName = patientDocSnap.data().name;
    
    
    await addDoc(appointmentsColRef, {
      comentario,
      fechaCita,
      razonCita,
      doctorId,
      patientName
    });

    
    navigation.goBack()
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
  
    const fetchAppointments = async (retries = 3, delay = 1000) => {
      const db = getFirestore();
      try {
        
        const userInfo = await AsyncStorage.getItem('@userLogged');
        const user = userInfo ? JSON.parse(userInfo) : null;
  
        if (!user || !user.uid) {
          throw new Error('User information is not available');
        }
  
        const doctorId = user.uid;
  
        
        const appointmentsQuery = query(collectionGroup(db, 'appointments'), where('doctorId', '==', doctorId));
        const querySnapshot = await getDocs(appointmentsQuery);
  
        const appointmentsList = [];
        querySnapshot.forEach((doc) => {
          appointmentsList.push({ id: doc.id, ...doc.data() });
        });
  
        setAppointments(appointmentsList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error obteniendo las citas: ', error);
        if (retries > 0) {
          console.log(`Reintentando... ${retries} veces restantes.`);
          setTimeout(() => fetchAppointments(retries - 1, delay * 2), delay); 
        } else {
          setIsLoading(false); 
          
        }
      }
    };
  
    fetchAppointments();
  }, []);

  const renderCitas = ({ item }) => (


<View  style={styles.citaContainer}>
<View style={styles.initialsCircle}>
  <Text style={styles.initialsText}>{item.patientName}</Text>
</View>
<View style={styles.citaDetails}>
  <Text style={styles.pacienteText}>{item.razonCita}</Text>
  <Text style={styles.horaText}>{item.fechaCita}</Text>
</View>
</View>
  );


  
  useEffect(() => {
    const checkUserAppointments = async (retries = 3, delay = 1000) => {
      setIsLoading(true);
    
      const db = getFirestore();
      try {
        const userInfo = await AsyncStorage.getItem('@userLogged');
        const user = userInfo ? JSON.parse(userInfo) : null;
    
        if (!user || !user.uid) {
          throw new Error('User inssformation is not available');
        }
    
        const userId = user.uid;
    
        
        const userDocRef = doc(db, 'users', userId);
    
        
        const userDocSnap = await getDoc(userDocRef);
    
        if (userDocSnap.exists()) {
          
          const appointmentsCollectionRef = collection(userDocRef, 'appointments');
    
          
          const appointmentsSnapshot = await getDocs(appointmentsCollectionRef);
    
          if (!appointmentsSnapshot.empty) {
            
            const appointmentsList = [];
            appointmentsSnapshot.forEach((doc) => {
              appointmentsList.push({ id: doc.id, ...doc.data() });
            });
            setAppointmentsUser(appointmentsList);
          } else {
            
            console.log('User does not hawve any appointments.');
          }
        } else {
          
          console.log('User document does not exist.');
        }
    
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking user appointments: ', error);
        if (retries > 0) {
          console.log(`Retrying... ${retries} attempts remaining.`);
          setTimeout(() => checkUserAppointments(retries - 1, delay * 2), delay);
        } else {
          setIsLoading(false);
        }
      }
    };

    checkUserAppointments()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tus citas</Text>
        {rol == 'DOCTOR' ?  <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.buttonText}>Agregar cita</Text>
        </TouchableOpacity> : ''}
       
      </View>
      
      <View style={styles.space} />
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>Mis próximas citas</Text>
        {rol == 'DOCTOR' ? (
            <View>
            <FlatList
          data={appointments}
          renderItem={renderCitas}
          keyExtractor={(item) => item.id}
          
        />
            </View>
            ) : (
              <View>
              <FlatList
            data={appointmentsUser}
            renderItem={renderCitas}
            keyExtractor={(item) => item.id}
            
          />
              </View>            )}




      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <AgregarCitaForm onCancelar={toggleModal} onAgregar={agregarCita} />
        </View>
      </Modal>
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
    backgroundColor: '#87CEFA', 
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  addButton: {
    backgroundColor: 'transparent', 
    borderWidth: 1, 
    borderStyle: 'dashed', 
    borderColor: '#000000', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#000000', 
    fontWeight: 'bold',
  },
  linkText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  space: {
    marginBottom: 20,
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
    width: 70,
    height: 40,
    borderRadius: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});

export default TusCitasScreen;


