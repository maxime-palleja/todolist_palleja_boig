import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';

function ViewTaskScreen({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Nom"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Description"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Statue"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Assignation"
                    style={styles.input}
                />

                <Text style={styles.error}>{error}</Text>
                <Button title="Modifier" onPress={handleSubmit} style={styles.button} />
                <Button title="Supprimer" onPress={handleSubmit} style={styles.button} />
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

export default ViewTaskScreen;
