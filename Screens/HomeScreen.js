import {View, Text, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity, Alert, RefreshControl} from 'react-native';
import * as React from "react";
import Task from "../Component/Task";
import {useState, useEffect} from "react";


function HomeScreen({navigation, route}) {
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            fetchData();
        }, 2000);
    }, []);

    // useEffect(() => {
    //     console.log('la')
    //     const fetchData = async () => {
    //         console.log('b')
    //         try {
    //             const keys = await AsyncStorage.getAllKeys();
    //             const items = await AsyncStorage.multiGet(keys);
    //             setData(items.map(([key, value]) => ({key, value: JSON.parse(value)})));
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    const fetchData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const items = await AsyncStorage.multiGet(keys);
            setData(items.map(([key, value]) => ({key, value: JSON.parse(value)})));
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);



    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={styles.tasksWrapper}>
                    <View style={styles.items}>
                        {data === null ? (
                            <Text>Loading...</Text>
                        ) : (data.map((item, index) => {
                            return (
                                <TouchableOpacity key={item.key} onPress={() => Alert.alert("MODIFIER / SUPPRIMER", "Tâche : "+item.value.name, [
                                        {text: "Annuler", style: "cancel"},
                                        {text: "Modifier", onPress: () => navigation.navigate("ModifyTask",{key:item.key ,name:item.value.name, description:item.value.description, statue:item.value.statue, assigne:item.value.assigne}), onRefresh},
                                        {text: "Supprimer", onPress: () => AsyncStorage.removeItem(key)}],
                                    {cancelable: false}
                                )
                                }>
                                    <Task name={item.value.name} description={item.value.description} statue={item.value.statue} assigne={item.value.assigne}/>
                                </TouchableOpacity>
                            )
                        }))

                        }
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>Ajouter une tache</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Alert.alert("Confirmation", "Êtes-vous sûr de vouloir supprimer toutes les données?", [
                        {text: "Annuler", style: "cancel"},
                        {text: "Supprimer", onPress: () => AsyncStorage.clear()}
                    ],
                    {cancelable: false}
                )
                }>
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>Tout supprimer</Text>
                </View>
            </TouchableOpacity>
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
        width: '80%',
    },
    addWrapper: {
        backgroundColor: '#0072C6',
        borderRadius: 60,
        padding: 15,
        marginTop: 30,
    },
    addText: {
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
