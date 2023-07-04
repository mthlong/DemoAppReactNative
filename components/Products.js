import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import { getFirestore, doc, deleteDoc, updateDoc} from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function Product({
    id,
    emoji,
    name,
    price,
    isSold
}) {
    const navigation = useNavigation();
    const database = getFirestore();

    const handleBuyProduct = () => {
        const docRef = doc(database, 'products', id);
        updateDoc(docRef, {
            isSold: true,
        })
    }
    const handleDeleteProduct = () => {
        const docRef = doc(database, 'products', id);
        deleteDoc(docRef);
    }
    const handleOnEdit = () => {
        navigation.navigate('Edit', {
            paramKey: {id: id, emoji: emoji,name: name,price: price}
        })
    }
    return (
        <View style={styles.productContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.emoji}>{emoji}</Text>
                <Icon onPress={handleDeleteProduct} name='delete-outline' size={24}></Icon>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price} $</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-end' }}>
                <Icon onPress={handleOnEdit} name='edit' size={35}></Icon>
                <View style={{ width: 160, paddingTop: 20, paddingLeft: 10, alignSelf: 'flex-end'}}>
                    {isSold ? 
                    (<SoldOutButton/>) : 
                    (<CustomButton buttonLabel={'Purchase'} onPress={handleBuyProduct} />)}
                </View>
            </View>
            
        </View>
    )
}

export function SoldOutButton() {
    return (<View
        style={{
            backgroundColor: 'gray',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
        }}>
        <Text
            style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 16,
                textAlign: 'center',
            }}>
            Sold out !!!
        </Text>
    </View>)
}

const styles = StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 14,
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
        fontSize: 70,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    price: {
        paddingLeft: 10,
        fontSize: 24,
        color: 'gray'
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