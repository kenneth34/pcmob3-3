import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Text,
 View,
 FlatList,
 TouchableOpacity,
 Pressable,

} from "react-native";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import CheckBox from 'react-native-check-box';
import NativePermissionsAndroid from "react-native/Libraries/PermissionsAndroid/NativePermissionsAndroid";

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ route, navigation }) {
 const [notes, setNotes] = useState([
   { title: "Walk the cat", done: false, id: "0" },
   { title: "Feed the elephant", done: false, id: "1" },
   
 ]);

 useEffect(() => {
   db.transaction((tx) => {
     tx.executeSql(
       `CREATE TABLE IF NOT EXISTS
       notes
       (id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        done INT);`
     );
   });
  }, []);
   

 useEffect(() => {
   navigation.setOptions({
     headerRight: () => (
       <TouchableOpacity onPress={addNote}>
         <Entypo
           name="new-message"
           size={24}
           color="black"
           style={{ marginRight: 20 }}
         />
       </TouchableOpacity>
     ),
   });
 });

 useEffect(() => {
  if (route.params?.text) {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO notes (done, value) VALUES (0, ?)", [
        route.params.text,
      ]);
    });

    
    const newNote = {
      title: route.params.text,
      done: false,
      id: notes.length.toString(),
    };
    setNotes([...notes, newNote]);
  }
}, [route.params?.text]);


 function addNote() {
   navigation.navigate("Add Note");
 }
  
const deleteNote = id => {
  setNotes(prevNotes => {
    return prevNotes.filter(notes => notes.id != id)
  })
}

function MyCheckbox() {
  const [checked, onChange] = useState(false);

  function onCheckmarkPress() {
    onChange(!checked);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onCheckmarkPress}>
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
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
         flexDirection: "row",
         justifyContent: "space-between",
       }}
     > 
     
      

      <View style={styles.checkboxContainer}>
        <MyCheckbox />
       
      </View>
 
        

     
     
       
       <Text style={{ textAlign: "left", fontSize: 18,  }}>{item.title}</Text>
       
       <TouchableOpacity onPress={() => deleteNote(item.id)}>
         <MaterialIcons
        name="delete"
        size={24}
        color="black"
        style={{ marginRight: 20}}
        
     />
     </TouchableOpacity>
     </View>
     
   );
 }

 return (
   <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
     />
     
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
 doneNote: {
   color: "red",
 },
 checkboxBase: {
  width: 26,
  height: 26,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderWidth: 2,
  borderColor: 'coral',
  backgroundColor: 'transparent',
},

checkboxChecked: {
  backgroundColor: 'coral',
},

appContainer: {
  flex: 1,
  alignItems: 'center',
},

appTitle: {
  marginVertical: 16,
  fontWeight: 'bold',
  fontSize: 24,
},

checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},


});
