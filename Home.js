import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView} from 'react-native';

const App = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        };
  
    const patientsData = [
        { name: 'Ernesto Araujo', phone: '0000-0000', id: '#012345' },
        { name: 'Angel Abarca', phone: '0000-0000', id: '#067891' },
        { name: 'Lorena Parcas', phone: '0000-0000', id: '#048795' },
        { name: 'Daniela Pleitez', phone: '0000-0000', id: '#97248' },
      ];
    
      // Función para renderizar cada elemento de la lista
      const renderItem = ({ item }) => (
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <Text>{item.name}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.id}</Text>
          </View>
        </View>
      );

      
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ flex: 1, padding: 20 }}>
       {/* Expand Menu */}
       <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'relative'}}>
        {/* Botón para expandir el menú */}
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={toggleMenu}>
          <Text>☰</Text>
        </TouchableOpacity>
        {/* Menú desplegable */}
        {menuVisible && (
          <View style={{ position: 'absolute', top: 30, right: 10, backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: 'black', zIndex: 1}}>
            <TouchableOpacity style={{ padding: 10 }}>
              <Text>Tus citas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }}>
              <Text>Pacientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }}>
              <Text>Doctores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }}>
              <Text>Mi perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }}>
              <Text>Salir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>
        Bienvenido de nuevo
      </Text>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 5 }}>
        Dr. Alex Siguenza
      </Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>
        ¿Cómo podemos ayudarte ahora?
      </Text>

    {/* Proximas citas*/}
    <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{'\n'}Tus próximas citas:</Text>
        <View style={{ marginTop: 10 }}>
          {/* Recuadro con las citas */}
          <View style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5 }}>
            <TouchableOpacity style={{ backgroundColor: '#e3f6fd',position: 'absolute', top: 5, right: 5, borderRadius: 2, padding: 5}}>
            <Text style={{ color: 'black', textAlign: 'center' }}>Agregar nueva cita +</Text>
            </TouchableOpacity>
            <Text>{'\n'}Paciente: Laura Quintanilla</Text>
            <Text>Hora: 08:00 am</Text>
            <Text>{'\n'}Paciente: Laura Quintanilla</Text>
            <Text>Hora: 08:00 am</Text>
            {/* Botón para ver citas */}
            <TouchableOpacity style={{ backgroundColor: '#008CBA', padding: 10, borderRadius: 5, marginTop: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Ver Todas mis citas</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>

    {/* Pacientes*/}
    <View style={{ marginTop: 20 }}>
                {/* Pacientes */}
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pacientes:</Text>
                <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5}}>
                    <FlatList
                        data={patientsData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2} // Mostrar en dos columnas
                    />
                </View>
                {/* Botón para agregar nuevo paciente */}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#008CBA', padding: 10, borderRadius: 5, flex: 1, marginRight: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Agregar nuevo paciente</Text>
                    </TouchableOpacity>
                    {/* Botón para ver todos los pacientes */}
                    <TouchableOpacity style={{ backgroundColor: '#008CBA', padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Ver Todos mis pacientes</Text>
                    </TouchableOpacity>
                </View>
            </View>{/*Fin Pacientes*/}
    </View>
    </ScrollView>
  );
};
export default App;