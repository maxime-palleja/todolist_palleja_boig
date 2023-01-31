import {Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from "./Screens/HomeScreen";
import DetailsScreen from "./Screens/DetailsScreen";
import AddTaskScreen from "./Screens/AddTaskScreen";
import ModifyTaskScreen from "./Screens/ModifyTaskScreen";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Details" component={DetailsScreen}
                        options={{
                          title: 'Liste des tâches',
                          headerStyle: {
                            backgroundColor: '#CCFFE5',
                          },
                          headerRight: () => (
                              <Button
                                  onPress={() => alert("Message d'alerte!")}
                                  title="+"
                                  color="#00cc00"
                              />),
                        }
                        }/>
          <Stack.Screen name="Home" component={HomeScreen}
                        options={{
                            title: 'Liste des tâches',
                          headerStyle: {
                            backgroundColor: '#FBDFFF',
                          },
                          headerRight: () => (
                              <Button
                                  onPress={() => alert("Version 1.0.1")}
                                  title="?"
                                  color="#000000"
                              />),
                        }}/>
            <Stack.Screen name="AddTask" component={AddTaskScreen}
                          options={{
                              title: 'Ajouter une tache',
                              headerStyle: {
                                  backgroundColor: '#FBDFFF',
                              },
                              headerRight: () => (
                                  <Button
                                      onPress={() => alert("Version 1.0.1")}
                                      title="?"
                                      color="#000000"
                                  />),
                          }}/>
            <Stack.Screen name="ModifyTask" component={ModifyTaskScreen}
                          options={{
                              title: 'Modifier la tâche',
                              headerStyle: {
                                  backgroundColor: '#FBDFFF',
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
