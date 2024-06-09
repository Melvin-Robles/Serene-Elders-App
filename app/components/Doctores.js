import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NuevoDoctorForm from './NuevoDoctor';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collectionGroup,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";


const Doctores = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const [showForm, setShowForm] = useState(false);
    const [listDoctors, setListDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const toggleMenu = () => {
    setMenuVisible(!menuVisible);};

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
      };
      
      const closeModal = () => {
        setModalVisible(false);
      };


      useEffect(() => {
        const fetchDoctorUsers = async () => {
          setIsLoading(true);
        
          const db = getFirestore();
          try {
            const doctorUsersQuery = query(collection(db, 'users'), where('rol', '==', 'DOCTOR'));
            const querySnapshot = await getDocs(doctorUsersQuery);
        
            const doctorUsersList = [];
            querySnapshot.forEach((doc) => {
              doctorUsersList.push({ id: doc.id, ...doc.data() });
            });
        
            setIsLoading(false);
            console.log(doctorUsersList);
            setListDoctors(doctorUsersList);
            return doctorUsersList;
          } catch (error) {
            console.error('Error fetching doctor users: ', error);
            setIsLoading(false);
            return [];
          }
        };
        fetchDoctorUsers()
          }, []);

          const renderDoctors = ({ item }) => (
<View style={styles.doctorContainer}>
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorSpecialty}>{item.surname}</Text>
      <Text style={styles.doctorStatus}>{item.email}</Text>
      <Text>{item.celphone}</Text>
    </View>
          );
    

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 20 }}>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={toggleMenu}>
          <Text>☰</Text>
        </TouchableOpacity>
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.navigate('TusCitasScreen')} style={[styles.menuItem, { backgroundColor: '#1499C3' }]}>
              <Image source={require('../../assets/Calendar.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Tus citas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#8D16AB' }]}>
              <Image source={require('../../assets/Paciente.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Pacientes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Doctores')} style={[styles.menuItem, { backgroundColor: '#0A7461' }]}>
              <Image source={require('../../assets/doctor.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Doctores</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={[styles.menuItem, { backgroundColor: '#A01C34' }]}>
              <Image source={require('../../assets/user.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Mi perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.menuItem, { backgroundColor: '#DF4D0E' }]}>
              <Image source={require('../../assets/salir.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Salir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      
      <View style={styles.container}>
        <View style={styles.header}>
        <Image source={require('../../assets/doctor.png')} style={styles.headerIcon} />
          <Text style={styles.headerText}>Doctores</Text>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={closeModal}
>
            <View style={styles.modalContainer}>
                <NuevoDoctorForm />
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
            <Text style={styles.addButtonText}>Agregar nuevo Dr. +</Text>
        </TouchableOpacity>
        <View style={styles.container2} >
        <ScrollView>
          <View style={styles.section}>
          <TouchableOpacity style={{ marginTop: 5, flexDirection: 'row', marginBottom:10 }}>
            <Image source={require('../../assets/green.png')} style={styles.Icon} />
            <Text style={styles.sectionHeader}>Disponibles</Text>
          </TouchableOpacity >
          <FlatList
                data={listDoctors}
                renderItem={renderDoctors}
                keyExtractor={(item) => item.id}
              />          
          </View>
        </ScrollView>
        </View>   
        
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10
  },
  container3: {
    paddingLeft:30
  },
  header: {
    backgroundColor: '#00695c',
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-end',
    margin: 10, 
  },
  addButtonText: {
    color: '#000',
    fontSize: 14,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  doctorContainer: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'column'
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  doctorStatus: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 1,
    borderRadius: 5,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 25,
    borderRadius: 5,
    marginTop: 5,
  },
  menuIcon: {
    width: 25,
    height: 25,
  },
  menuText: {
    color: 'white',
    marginLeft: 10,
  },
  Icon: {
    width: 25, 
    height: 25,
    marginRight:10
  },
  headerIcon:{
    width: 50, 
    height: 50,
    marginRight:10
  },
  closeButton: {
    backgroundColor: '#A70B0B',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fondo semi-transparente
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    paddingLeft:30,
    paddingRight:30,
  },

});

export default Doctores;