//import des librairies nécessaires
import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';


function ModifyTaskScreen({navigation,route}) {
    //déclaration des variables
    const [formData, setFormData] = useState({id: '', name: '', description: '', statue: '', assigne: ''});
    const [error, setError] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    //déclaration des états possibles
    const listAvancement = [
        {label: 'À faire', value: '1'},
        {label: 'En cours', value: '2'},
        {label: 'Terminé', value: '3'}
    ];
    useEffect(() => {
        if(route.params) {
            const formData = setFormData({id :route.params.key,
                name :route.params.name,
                description : route.params.description,
                statue : route.params.statue,
                assigne : route.params.assigne})
        }
    }, [route.params.key,route.params.name,route.params.description,route.params.statue,route.params.assigne])

    //méthode qui vérifie que les champs ont été renseignés, si tel est le cas enregistrement des modifications
    const handleSubmit = () => {
        if (!formData.assigne || !formData.name || !formData.description || !formData.statue) {
            setError('Tous les champs doivent être remplis');
            return;
        } else {
            AsyncStorage.setItem(formData.id.toString(), JSON.stringify(formData))
            navigation.navigate("Home",{refresh: true})
            setFormData(null)
        }
        setError('');
    };
    //formulaire de modification
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Tâche à réaliser"
                    value={formData.name}
                    onChangeText={(text) => setFormData({...formData , name : text})}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Description de la tâche"
                    multiline
                    value={formData.description}
                    onChangeText={(text) => setFormData({...formData, description: text})}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Assignation"
                    value={formData.assigne}
                    onChangeText={(text) => setFormData({...formData, assigne: text})}
                    style={styles.input}
                />
                <Dropdown
                    style={[styles.input, isFocus && {borderColor: 'blue'}]}
                    data={listAvancement}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? formData.statue : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                        setFormData({...formData, statue: item.label})
                    }}
                />

                <Text style={styles.error}>{error}</Text>
                <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>Modifier</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>navigation.navigate("ModifyTask",{key: route.params.key,name:route.params.name, description:route.params.description, statue:route.params.statue, assigne:route.params.assigne})}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>Reset</Text>
                    </View>
                </TouchableOpacity>
                </View>
        </View>

    );
};

// propriétés CSS / front
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop:30
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginVertical: 10,
    },
    addWrapper: {
        backgroundColor: '#0072C6',
        borderRadius: 50,
        padding: 15,
        marginTop: 10,
    },
    addText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }

});

export default ModifyTaskScreen;
