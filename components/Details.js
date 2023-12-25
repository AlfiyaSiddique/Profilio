import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Details = ({ employee, listView , setListView, setSelectedEmployee, manager, subordinates }) => {

    // Employee Data
  const { name, email, phone, backgroundColor, address, id } = employee;

//   Function to switch between single card and list
  const handleViewSwitch = () => {
    setListView(!listView); // Toggle between list view and single card view
    setSelectedEmployee(null); // Clear selected employee when switching views
  };

//   Generates random color for newly added cards of emplyoee
  let textColor = getTextColorForBackground(backgroundColor);
  backgroundColor === "yellow" ? textColor = "black": null;
  backgroundColor === "white" ? textColor = "black": null;
  return (
    <View style={[styles.container, { backgroundColor }]}>
    <View style={styles.button}>
        <Button title={listView ? 'Switch to Single Card View' : 'Switch to List View'} onPress={handleViewSwitch} />
      </View>
      <Text style={[styles.title, {color: textColor}]}>{name}</Text>
      <Text style={ {color: textColor}}>Enployee ID: {id}</Text>
      <Text style={ {color: textColor}}>Email: {email}</Text>
      <Text style={ {color: textColor}}>Phone: {phone}</Text>
      <Text style={ {color: textColor}}>Address: {address}</Text>

       {manager !== undefined && <View style={[styles.pad]}>
       <Text style={[styles.title, {color: textColor}]}>Reporting Manager</Text>
       <Text style={[{color: textColor}]}>Name: {manager.name}</Text>
       <Text style={[{color: textColor}]}>Email: {manager.email}</Text>
       <Text style={[ {color: textColor}]}>Phone: {manager.phone}</Text>
       <Text style={[ {color: textColor}]}>Address: {manager.address}</Text>
       </View>}
      {subordinates && subordinates.length > 0 && (
        <View>
          <Text style={[styles.title,styles.pad, {color: textColor}]}>Subordinates:</Text>
          {subordinates.map((subordinate, index) => {
            return <View key={index} style={[styles.pad]}>
            <Text style={ {color: textColor}}>Employee ID: {subordinate.id}</Text>
            <Text style={ {color: textColor}}>Name: {subordinate.name}</Text>
            <Text  style={ {color: textColor}}>Email: {subordinate.email}
            </Text>
            </View>
          })}
        </View>
      )}
      {/* Add other employee details as needed */}
    </View>
  );
};

// Determine whether text color should be black or white based on brightness
const getTextColorForBackground = (backgroundColor) => {
    const rgb = parseInt(backgroundColor.substring(1), 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff; // Extract R
    const g = (rgb >> 8) & 0xff; // Extract G
    const b = (rgb >> 0) & 0xff; // Extract B
    const brightness = (r * 299 + g * 587 + b * 114) / 1000; 
  
    return brightness > 125 ? 'black' : 'white'; 
  };

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginBottom: 20
  },
  pad: {
    padding: 10
  },
});

export default Details;
