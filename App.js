import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState }  from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, } from "react-native";
import { createStackNavigator} from "@react-navigation/stack";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
//import { TouchableOpacity } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import NotesStack from "./screens/NotesStack";
import AddScreen from "./screens/AddScreen";
import CheckBox from 'react-native-check-box';


const db = SQLite.openDatabase("notes.db");

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator model="modal">
        <Stack.Screen
          name="Notes Stack"
          component={NotesStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Note" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
 }
 
 

function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([
    {title: "Walk the cat", done: false, id: "0"},
    {title: "Feed the elephant", done: false, id: "1"},
  ]);

 useEffect(() => {
   navigation.setOptions({
     headerRight: () => (
       <TouchableOpacity onPress={addNote}>
       <Entypo 
       name="new-message"
       size={24}
       color="black"
       style={{ marginRight: 20}}
       />
       </TouchableOpacity>
     ),
   });
   });

const InnerStack = createStackNavigator();



function addNote() {
  let newNotes = {
    title: "Sample new note",
    done: false,
    id: notes.length.toString(),
  };
  setNotes([...notes, newNotes])
}   

function renderItem({ item }) {
  return (
    
    <View
      style={{
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
      }}
    >
      <Text style={{ textAlign: "left", fontSize: 20 }}>{item.title}</Text>
      
     
       </View>
     
     
  );
}

return (
  <View style={styles.container}>
    <FlatList
      style={{ width: "50%" }}
      data={notes}
      renderItem={renderItem}
      />
     <MaterialIcons 
     name="delete"
     size={24}
     color="black"
     style={{ marginRight: 20}}
     /> 
    </View>
);
}


const Stack = createStackNavigator();


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});