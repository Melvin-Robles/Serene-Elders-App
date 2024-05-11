import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image} from 'react-native';

const App = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        };
  
        const patientsData = [
          { name: 'Ernesto Araujo', phone: '0000-0000', id: '#012345', gender: 'male' },
          { name: 'Angel Abarca', phone: '0000-0000', id: '#067891', gender: 'male' },
          { name: 'Lorena Parcas', phone: '0000-0000', id: '#048795', gender: 'female' },
          { name: 'Daniela Pleitez', phone: '0000-0000', id: '#97248', gender: 'female' },
      ];

      
    // Función para renderizar cada elemento de la lista
    const renderItem = ({ item }) => {
        // Seleccionar la imagen correspondiente al género del paciente
        let imageSource = require('../../assets/UserM.png'); 
        if (item.gender === 'female') {
            imageSource = require('../../assets/UserF.png');
        }

        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                <Image source={imageSource} style={{ width: 30, height: 30, marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                    <Text>{item.name}</Text>
                    <Text>{item.phone}</Text>
                    <Text>{item.id}</Text>
                </View>
            </View>
        );
    };

      
  return (
    
    <View style={{ flex: 1, padding: 20 }}>
       {/* Expand Menu */}
       <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'relative'}}>
        {/* Botón para expandir el menú */}
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={toggleMenu}>
          <Text>☰</Text>
        </TouchableOpacity>
        {/* Menú desplegable */}
        {menuVisible && (
          <View style={{ position: 'absolute', top: 30, right: 10,  zIndex: 1}}>
            <TouchableOpacity style={{ backgroundColor: '#1499C3', borderRadius: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft:25 }}>
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
            <TouchableOpacity style={{ backgroundColor: '#A01C34', borderRadius: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft:25}}>
                <Image source={require('../../assets/user.png')} style={{ width: 25, height: 25 }} />
                <Text style={{ color: 'white' }}> Mi perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: '#DF4D0E', borderRadius: 5, marginTop: 5, flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft:35 }}>
                <Image source={require('../../assets/salir.png')} style={{ width: 25, height: 25 }} />
                <Text style={{ color: 'white' }}> Salir</Text>
              </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20,  fontWeight: 'light'}}>
        Bienvenido de nuevo
      </Text>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 5 }}>
        Dr. Alex Siguenza
      </Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5,  fontWeight: 'light' }}>
        ¿Cómo podemos ayudarte ahora?
      </Text>

    {/* Proximas citas*/}
    <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{'\n'}Tus próximas citas:</Text>
        <View style={{ marginTop: 10 }}>
          {/* Recuadro con las citas */}
          <View style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5, borderStyle: 'dashed'  }}>
            <TouchableOpacity style={{ backgroundColor: '#e3f6fd', position: 'absolute', top: 5, right: 5, borderRadius: 2, padding: 5}}>
            <Text style={{ color: 'black', textAlign: 'center' }}>Agregar nueva cita +</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/number-8.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
              <View>
                <Text>{'\n'}Paciente: Laura Quintanilla</Text>
                <Text>Hora: 08:00 am{'\n'}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/number-12.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
              <View>
                <Text>Paciente: Ernesto Araujo</Text>
                <Text>Hora: 09:00 am</Text>
              </View>
            </View> 
            {/* Botón para ver citas */}
            <TouchableOpacity style={{ backgroundColor: '#2D14C3', padding: 10, borderRadius: 5, marginTop: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Ver Todas mis citas</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>

    {/* Pacientes*/}
    <View style={{ marginTop: 20 }}>
          {/* Mostrar Pacientes */}
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pacientes:</Text>
                <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5, borderStyle: 'dashed' }}>
                    <FlatList
                        data={patientsData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2} // Mostrar en dos columnas
                    />
                </View>
                {/* Botón para agregar nuevo paciente */}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#2D14C3', padding: 10, borderRadius: 5, flex: 1, marginRight: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Agregar nuevo paciente</Text>
                    </TouchableOpacity>
                    {/* Botón para ver todos los pacientes */}
                    <TouchableOpacity style={{ backgroundColor: '#008CBA', padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Ver Todos mis pacientes</Text>
                    </TouchableOpacity>
                </View>
            </View>{/*Fin Pacientes*/}
    </View>
    
  );
};
export default App;