import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Card that shows Emloyee Name on the list
const Card = ({ employee, onSelect, manager}) => {
  const { name,email,  backgroundColor, phone } = employee;
  let textColor = "black";
  backgroundColor === "black" ? textColor = "white": null;
  backgroundColor === "blue" ? textColor = "white": null;
  return (
    <View>
      <TouchableOpacity onPress={() => onSelect(employee)}>
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={[styles.title, {color: textColor}]}>{name}</Text>
        <Text style={[{color: textColor}]}>Email: {email}</Text>
        <Text  style={[{color: textColor}]}>Phone: {phone}</Text>
        <Text style={[{color: textColor}]}>{manager !== undefined && `Manager: ${manager.name}`}</Text>
      </View>
    </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  card: {
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
  }
});

export default Card;
