import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemText}>{props.name}:{'\n'}</Text>
                <Text style={styles.itemText}>{props.description}{'\n'}</Text>
                <Text style={styles.itemText}>Assigné à: {props.assigne}{'\n'}</Text>
                <Text style={styles.itemText}>Avancement: {props.statue}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    itemText: {
        maxWidth: '100%',
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