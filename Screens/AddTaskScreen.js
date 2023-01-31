import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, StyleSheet, AsyncStorage} from 'react-native';

function AddTaskScreen({navigation}) {
    const [formData, setFormData] = useState({id: null, name: '', description: '', statue: '', assigne: ''});
    const [error, setError] = useState('');


    const getMaxValue = async () => {
        let id = 0;
        let keys = [];
        try {
            keys = await AsyncStorage.getAllKeys();
            const stores = await AsyncStorage.multiGet(keys);
            stores.forEach((result) => {
                let key = result[0];
                if (id < key) id = key;
            });
        } catch (e) {
            console.log(e);
        }
        return id
    }

    const handleSubmit = async () => {
        if (!formData.assigne || !formData.name || !formData.description || !formData.statue) {
            setError('Tous les champs doivent être remplis');
            return;
        } else {
            let maxValue = parseInt(await getMaxValue()) + 1
            formData.id= parseInt(await getMaxValue()) + 1
            AsyncStorage.setItem((maxValue).toString(), JSON.stringify(formData))
            navigation.navigate("Home")
            setFormData(null)
        }
        setError('');
    };
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Nom"
                    value={formData.name}
                    onChangeText={(text) => setFormData({...formData, name: text})}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Description"
                    multiline
                    value={formData.description}
                    onChangeText={(text) => setFormData({...formData, description: text})}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Statue"
                    value={formData.statue}
                    onChangeText={(text) => setFormData({...formData, statue: text})}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Assignation"
                    value={formData.assigne}
                    onChangeText={(text) => setFormData({...formData, assigne: text})}
                    style={styles.input}
                />

                <Text style={styles.error}>{error}</Text>
                <Button title="Ajouter" onPress={handleSubmit} style={styles.button}/>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    button: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
    }
});

export default AddTaskScreen;
