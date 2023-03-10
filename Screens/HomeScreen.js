//import des librairies nécessaires
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    TouchableOpacity,
    Alert,
    RefreshControl
} from 'react-native';
import * as React from "react";
import Task from "../Component/Task";
import {useState, useEffect} from "react";


function HomeScreen({navigation, route}) {
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const items = await AsyncStorage.multiGet(keys);
            setData(items.map(([key, value]) => ({key, value: JSON.parse(value)})));
        } catch (error) {
            console.error(error);
        }
    };

    //méthode qui rafraîchit l'app, appelée lorsque scroll vers le bas
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            fetchData();
        }, 300);
    }, []);
    const onRefreshInstant = React.useCallback(() => {
        setRefreshing(true);
        setRefreshing(false);
        fetchData();
    }, []);

    //suppression de la tâche puis rafraîchissement de l'app
    const refreshOnDelete = (key) => {
        AsyncStorage.removeItem(key)
        onRefreshInstant()
    };
    const refreshOnDeleteAll = () => {
        AsyncStorage.clear()
        onRefreshInstant()
    };

    useEffect(() => {
        if (route.params?.refresh) {
            onRefreshInstant();
            navigation.setParams({ refresh: false });
        }onRefreshInstant();
    }, [route.params?.refresh]);
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <View style={styles.tasksWrapper}>
                    <View style={styles.items}>
                        {data === null ? (
                            <Text>Pas de tâches pour le moment...</Text>
                        ) : (data.map((item, index) => {
                            return (
                                <TouchableOpacity key={item.key}
                                                    //lorsque la tâche est touchée, affichage des actions possibles à faire
                                                  onPress={() => Alert.alert("MODIFIER / SUPPRIMER", "Tâche : " + item.value.name, [
                                                          {text: "Annuler", style: "cancel"},
                                                          {
                                                              text: "Modifier",
                                                              onPress: () => navigation.navigate("ModifyTask", {    //redirection vers l'écran de modification
                                                                  key: item.key,
                                                                  name: item.value.name,
                                                                  description: item.value.description,
                                                                  statue: item.value.statue,
                                                                  assigne: item.value.assigne
                                                              }),
                                                              onRefresh
                                                          },
                                                          {text: "Supprimer", onPress: () => refreshOnDelete(item.key)}],   //suppression de la tâche sélectionnée
                                                      {cancelable: false}
                                                  )
                                                  }>
                                    {/* // affichage des tâches avec les détails */}
                                    <Task name={item.value.name} description={item.value.description}
                                          statue={item.value.statue} assigne={item.value.assigne}/>
                                </TouchableOpacity>
                            )
                        }))

                        }
                    </View>
                </View>
            </ScrollView>
            {/* Boutons "Ajouter une tâche" et "Tout supprimer" en bas de l'écran principal */}
            <View style={styles.boutons}>
                <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
                    <View style={styles.addTask}>
                        <Text style={styles.addText}>Ajouter une tâche</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Alert.alert("Confirmation", "Êtes-vous sûr de vouloir supprimer toutes les tâches?", [
                            {text: "Annuler", style: "cancel"},
                            {text: "Supprimer", onPress: () => refreshOnDeleteAll()}
                        ],
                        {cancelable: false}
                    )
                    }>
                    <View style={styles.deleteAll}>
                        <Text style={styles.addText}>Tout supprimer</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;

// propriétés CSS / front
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    items: {
        marginTop: 30,
    },
    bouton: {},
    addTask: {
        backgroundColor: '#0072C6',
        borderRadius: 60,
        padding: 20,
        marginTop: 10,
        marginBottom: 10
    },
    deleteAll: {
        backgroundColor: '#AE0000',
        borderRadius: 60,
        padding: 20,
        marginTop: 10,
        marginBottom: 10
    },
    addText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
