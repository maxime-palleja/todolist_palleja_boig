import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

function AddTaskScreen({navigation}) {
    const [formData, setFormData] = useState({id: null, name: '', description: '', statue: '', assigne: ''});
    const [error, setError] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const listAvancement = [
        {label: 'À  faire', value: '1'},
        {label: 'En cours', value: '2'},
        {label: 'Terminé', value: '3'}
    ];

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
            formData.id = parseInt(await getMaxValue()) + 1
            AsyncStorage.setItem((maxValue).toString(), JSON.stringify(formData))
            navigation.navigate("Home", {refresh: true})
            setFormData(null)
        }
        setError('');
    };
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Tâche à réaliser"
                    value={formData.name}
                    onChangeText={(text) => setFormData({...formData, name: text})}
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
                    placeholder={!isFocus ? 'État : ' : '...'}
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
                        <Text style={styles.addText}>Ajouter</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    addWrapper: {
        backgroundColor: '#0072C6',
        borderRadius: 60,
        padding: 20,
        marginTop: 5,
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
    addText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        fontSize: 16,
    }
});

export default AddTaskScreen;
