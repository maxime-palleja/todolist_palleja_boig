import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemText}>{props.name}:{'\n'}{props.description}{'\n'}Avancement: {props.statue}{'\n'}Assigné à: {props.assigne}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    itemText: {
        maxWidth: '90%',
        borderRightWidth:'10px'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#B900FF',
        borderWidth: 6,
        borderRadius: 5,
    },
});

export default Task;