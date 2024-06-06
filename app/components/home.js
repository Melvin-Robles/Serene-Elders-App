import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collectionGroup, collection, query, where, getDocs } from 'firebase/firestore';



const Home = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  
  const [menuVisible, setMenuVisible] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [rol, setRol] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
    

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        };

        /* Peticiones */

        useEffect(() => {
          setIsLoading(true);
        
          const fetchAppointments = async (retries = 3, delay = 1000) => {
            const db = getFirestore();
            try {
              // Obtener la información del usuario logueado desde AsyncStorage
              const userInfo = await AsyncStorage.getItem('@userLogged');
              const user = userInfo ? JSON.parse(userInfo) : null;
        
              if (!user || !user.uid) {
                throw new Error('User information is not available');
              }
        
              const doctorId = user.uid;
        
              // Crear una consulta para obtener todos los documentos de la subcolección "appointments" con el doctorId especificado
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
                setTimeout(() => fetchAppointments(retries - 1, delay * 2), delay); // Aumenta el delay para el próximo intento
              } else {
                setIsLoading(false); // Asegúrate de detener el indicador de carga si ya no hay reintentos
                // Considera mostrar algún mensaje al usuario indicando que no se pudo obtener la información después de varios intentos
              }
            }
          };
        
          fetchAppointments();
        }, []);
        const renderCitas = ({ item }) => (
          <View style={{
            flex: 1,
            flexDirection: 'column',
            marginBottom: 15,
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: '#333',
              marginBottom: 5,
            }}>{item.patientName}</Text>
            <Text style={{
              fontSize: 16,
              color: '#666',
            }}>{item.razonCita} - {item.fechaCita}</Text>
          </View>
        );

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

        const [patientsData, setPatientsData] = useState([]);

        useEffect(() => {
          const getPatients = async () => {
            const patients = await fetchPatients();
            setPatientsData(patients);
          };

          getPatients();
        }, []);


        const renderItem = ({ item }) => (
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
             <Image source={'../../assets/UserM.png'} style={{ width: 30, height: 30, marginRight: 10 }} />
            <Text>{item.name} {item.surname}</Text>
          </View>
        );
  

      


      
  return (
    
    <View style={{ flex: 1, padding: 20 }}>
       <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'relative'}}>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={toggleMenu}>
          <Text>☰</Text>
        </TouchableOpacity>
        {menuVisible && (
          <View style={{ position: 'absolute', top: 30, right: 10,  zIndex: 1}}>
            <TouchableOpacity onPress={() => navigation.navigate('components/TusCitasScreen')} style={{ backgroundColor: '#1499C3', borderRadius: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft:25 }}>
              <Image source={require('../../assets/Calendar.png')} style={{ width: 25, height: 25 }} />
              <Text  style={{ color: 'white' }}> Tus citas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#8D16AB', borderRadius: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft:25 }}>
              <Image source={require('../../assets/Paciente.png')} style={{ width: 25, height: 25 }} />
              <Text style={{ color: 'white' }}> Pacientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#0A7461', borderRadius: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft:25 }}>
              <Image source={require('../../assets/doctor.png')} style={{ width: 25, height: 25 }} />
              <Text style={{ color: 'white' }}> Doctores</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('components/perfil')}  style={{ backgroundColor: '#A01C34', borderRadius: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft:25}}>
                <Image source={require('../../assets/user.png')} style={{ width: 25, height: 25 }} />
                <Text style={{ color: 'white' }}> Mi perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('components/login')} style={{backgroundColor: '#DF4D0E', borderRadius: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft:35 }}>
                <Image source={require('../../assets/salir.png')} style={{ width: 25, height: 25 }} />
                <Text style={{ color: 'white' }}> Salir</Text>
              </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20,  fontWeight: 'light'}}>
        Bienvenido de nuevo 
      </Text>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 5 }}>
      <Text>{rol == 'DOCTOR' ? 'Dr.' : 'Paciente'} {name} {surname}</Text>
      </Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5,  fontWeight: 'light' }}>
        ¿Cómo podemos ayudarte ahora?
      </Text>

    

    {rol == 'DOCTOR' ? (
            <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{'\n'}Tus próximas citas:</Text>
            <View style={{ marginTop: 10 }}>
              <View style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5, borderStyle: 'dashed'  }}>
                
            <View>
            <FlatList
          data={appointments}
          renderItem={renderCitas}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
            </View>
                  
    
                <TouchableOpacity  onPress={() => navigation.navigate('components/TusCitasScreen')} style={{ backgroundColor: '#2D14C3', padding: 10, borderRadius: 5, marginTop: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Ver Todas mis citas</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
            ) : (
              <Text style={{ color: 'black', textAlign: 'center' }}>Mostrar citas del paciente</Text>
            )}


            
    {rol == 'DOCTOR' ? (
        <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pacientes:</Text>
        <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5, borderStyle: 'dashed' }}>
            
        {isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
<FlatList
                data={patientsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2} 
            />
    )}
            
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity style={{ backgroundColor: '#008CBA', padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Ver Todos mis pacientes</Text>
            </TouchableOpacity>
        </View>
    </View>
            ) : (
              <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Doctores:</Text>
              <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5, borderStyle: 'dashed' }}>
                  

                  
              </View>
          </View>
            )}



    </View>
    
  );
};


export default Home;