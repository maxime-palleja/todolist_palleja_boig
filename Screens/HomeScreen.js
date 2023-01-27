import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const key = 'formData';
//
// const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     status: '',
//     assignation: ''
// });
//
// const saveFormData = async (formDataArray) => {
//     try {
//         await AsyncStorage.setItem(key, JSON.stringify(formDataArray));
//     } catch (error) {
//         console.log(error);
//     }
// };
//
// const getFormData = async () => {
//     try {
//         const formDataString = await AsyncStorage.getItem(key);
//         return JSON.parse(formDataString);
//     } catch (error) {
//         console.log(error);
//     }
// };


function HomeScreen({navigation, route}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>Ajouter une tache</Text>
                </View>
            </TouchableOpacity>
            <View>
                {route.params?.name ? (
                    <Text style={styles.addText}>Nom: {route.params.name}, Description: {route.params.description}, Statue:  {route.params.statue}, Assignation:  {route.params.assigne}</Text>
                ) : (
                    <Text style={styles.addText}>Pas d'enregistrement ou Erreur lors de l'enregistrement</Text>
                )}
            </View>
        </View>


    );
}

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 150,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {},
});
