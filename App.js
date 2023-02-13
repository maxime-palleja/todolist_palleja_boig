import {Button, StyleSheet, Text, View,Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from "./Screens/HomeScreen";
import AddTaskScreen from "./Screens/AddTaskScreen";
import ModifyTaskScreen from "./Screens/ModifyTaskScreen";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen name="Home" component={HomeScreen}
                        options={{
                            title: 'Liste des tâches',
                          headerStyle: {
                            backgroundColor: '#FBDFFF',
                          } ,headerRight: () => (
                                <Button
                                    onPress={() => Alert.alert("INFOS","Version:\n13-02-2023\nDéveloppement:\nMaxime PALLEJA\nGabriel BOIG")}
                                    title="?"
                                    color='#FFFFFFFF'
                                />),
                        }}/>
            <Stack.Screen name="AddTask" component={AddTaskScreen}
                          options={{
                              title: 'Ajouter une tache',
                              headerStyle: {
                                  backgroundColor: '#8e98e3',
                              }
                          }}/>
            <Stack.Screen name="ModifyTask" component={ModifyTaskScreen}
                          options={{
                              title: 'Modifier la tâche',
                              headerStyle: {
                                  backgroundColor: '#e48cee',
                              }
                          }}/>


        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
