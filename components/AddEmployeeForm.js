import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import randomColor from 'randomcolor';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Form that helps to add new Employee
const AddEmployeeForm = ({ onAddEmployee, isVisible, toggleFormVisibility }) => {
//  States to store employee Data
  const [id, setID] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
 
  const FetchID = async () => {
    try {
      const newID = await JSON.parse(await AsyncStorage.getItem("newId"))
      setID(newID)
    } catch (error) {
     console.log(error); 
    }
  };
 
  FetchID()
//   Adds employee data to list
  const handleAddEmployee = async () => {
    const newEmployee = {
        id,
      name,
      email,
      phone,
      address,
      parentId: id-1,
      backgroundColor: randomColor(),
    };

    onAddEmployee(newEmployee);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    toggleFormVisibility();
    const nextId = parseInt(id) + 1;
    await AsyncStorage.setItem("newId", JSON.stringify(`${nextId}`))
    FetchID()
    Alert.alert('Success', 'Employee added successfully');
  };

  if (!isVisible) {
    return null; // Don't render the form if it's not visible
  }

//   Form Input fields
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      {/* Add more input fields for other employee details */}
      <Button title="Submit" onPress={handleAddEmployee} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddEmployeeForm;
