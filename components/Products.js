import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import { getFirestore, collection, addDoc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
//const database = getFirestore();

export default function Product({
    id,
    emoji,
    name,
    price,
    isSold
}) {
    return (
        <View style= {styles.productContainer}>
            <Text style= {styles.emoji}>{emoji}</Text>
            <Text style= {styles.name}>{name}</Text>
            <Text style= {styles.price}>{price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        padding:16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }, 
    emoji: {
        fontSize: 100,
    }, 
    name: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 24,
        fontWeight:'bold',
        color: 'gray'
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
    }, 
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    },

    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})