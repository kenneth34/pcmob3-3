export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Notes"
            component={NotesScreen}
            options={{
              headerTitle: "Notes App",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerStyle: {
                height: 120,
                backgroundColor: "yellow",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
   }


   function NotesStack() {
    return (
      <InnerStack.Navigator>
         <InnerStack.Screen
           name="Notes"
           component={NotesScreen}
           options={{
             headerTitle: "Notes App",
             headerTitleStyle: {
               fontWeight: "bold",
               fontSize: 30,
             },
             headerStyle: {
               height: 120,
               backgroundColor: "yellow",
               borderBottomColor: "#ccc",
               borderBottomWidth: 1,
             },
            }}
            />
            </InnerStack.Navigator>
    );
  }
   

   