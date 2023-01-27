import {Button,Text, View} from "react-native";
import * as React from "react";

function HomeScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details ->"
                onPress={() => navigation.navigate('Details')}
            />
        </View>

    );
}

export default HomeScreen;
