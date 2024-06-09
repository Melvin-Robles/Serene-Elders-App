import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NuevoDoctorForm from './NuevoDoctor';


const Doctores = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const [showForm, setShowForm] = useState(false);

    const toggleMenu = () => {
    setMenuVisible(!menuVisible);};

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
      };
      
      const closeModal = () => {
        setModalVisible(false);
      };

    

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
          <TouchableOpacity style={styles.container3}> 
            <Doctor name="Dra. Alejandra Portillo" specialty="Neurocirugía" status="Conectado" />
            <Doctor name="Dr. Melvin Robles" specialty="Gastroenterología" status="Conectado" />
            <Doctor name="Dr. Juan Valdez" specialty="Medico general" status="Conectado" />
            <Doctor name="Dra. Carolina Marin" specialty="Medico general" status="Conectado" />
          </TouchableOpacity>
          </View>
          <View style={styles.section}>
          <TouchableOpacity style={{ marginTop: 5, flexDirection: 'row', marginBottom:10 }}>
            <Image source={require('../../assets/red.png')} style={styles.Icon} />
            <Text style={styles.sectionHeader}>Desconectados</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.container3}> 
            <Doctor name="Dra. Daniela Fuentes" specialty="Pediatra" status="Desconectado" />
            <Doctor name="Dr. Alex Díaz" specialty="Ginecólogo" status="Desconectado" />
          </TouchableOpacity>
          </View>
        </ScrollView>
        </View>   
        
      </View>
    </View>
  );
};

const Doctor = ({ name, specialty, status }) => {
  return (
    <View style={styles.doctorContainer}>
      <Text style={styles.doctorName}>{name}</Text>
      <Text style={styles.doctorSpecialty}>{specialty}</Text>
      <Text style={styles.doctorStatus}>{status}</Text>
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