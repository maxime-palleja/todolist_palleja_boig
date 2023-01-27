import {Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View, AsyncStorage} from "react-native";
import {useState, useEffect} from 'react';
import * as React from "react";

function DetailsScreen({navigation}) {
    const [name, setName] = useState("");
    useEffect(() => {
        AsyncStorage.getItem("name")
            .then(name => {
                if (name) {
                    setName(name);
                }
            })
    }, []);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Details Screen</Text>
            <Button
                title="<- Go to About"
                onPress={() => navigation.navigate('About', {isDetailsScreen: true})}/>
        </View>,
            <SafeAreaView style={styles.container}>
                <TextInput
                    value={name}
                    onChangeText={text => setName(text)}
                    style={{borderWidth: 1}}
                />
                <Button
                    title="Save name"
                    onPress={() => AsyncStorage.setItem("name", name)}
                />
            </SafeAreaView>

    );
}
const styles = StyleSheet.create(
    {
        container: {

            backgroundColor: '#CCFFFF',
            justifyContent: 'center',
        }
    }
)

export default DetailsScreen;
