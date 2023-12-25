import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Button } from "react-native";
import axios from "axios";
import Card from "./components/Card";
import Details from "./components/Details";
import AddEmployeeForm from "./components/AddEmployeeForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmployeeData = () => {
  // States to store employees, show single card and list view
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [listView, setListView] = useState(true);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false); //toggle add employee form component

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d"
        );
        setEmployeeData(response.data);
        await AsyncStorage.setItem("newId", JSON.stringify(`${response.data.length+1}`))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Selects  a employee to show single view card
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setListView(false);
  };

  // Add new Employee to the list
  const handleAddEmployee = (newEmployee) => {
    setEmployeeData([...employeeData, newEmployee]);
  };

  const toggleAddEmployeeForm = () => {
    setShowAddEmployeeForm(!showAddEmployeeForm);
  };

  const findManager = (managerId)=>{
    const manager = employeeData.filter((emp)=>{
      return emp.id == managerId
    })
    return manager[0]
  }

  const findSubordinate = (id)=>{
    const subordinates = []
    employeeData.map((emp)=>{
      if(emp.parentId === id){
        subordinates.push(emp)
      }
    })
    return subordinates
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {!listView ? (
        <Details
          employee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          listView={listView}
          setListView={setListView}
          manager={findManager(selectedEmployee.parentId)}
          subordinates={findSubordinate(selectedEmployee.id)}
        />
      ) : (
        <>
          <View>
            <Button title="Add Employee" onPress={toggleAddEmployeeForm} />
          </View>
          <View>
        {listView && (
          <AddEmployeeForm
            isVisible={showAddEmployeeForm}
            toggleFormVisibility={toggleAddEmployeeForm}
            onAddEmployee={handleAddEmployee}
          />
        )}
      </View>
          {employeeData.map((item) => {
            return (
              <Card
                key={item.id}
                employee={item}
                onSelect={handleEmployeeSelect}
                manager={findManager(item.parentId)}
              />
            );
          })}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
});

export default EmployeeData;
