import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { getFirestore, collection, orderBy, query, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import Product from '../components/Products';

const HomeScreen = () => {

    const database = getFirestore();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const collectionRef = collection(database, 'products');
        const q = query(collectionRef, orderBy('createAt', 'desc'))

        const unsuscribe = onSnapshot(q, querySnapshot => {
            setProducts(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    emoji: doc.data().emoji,
                    name: doc.data().name, 
                    price: doc.data().price,
                    isSold: doc.data().isSold,
                    createAt: doc.data().createAt
                }))
            )
        })
        console.log(products);
        return unsuscribe;
    }, [])

    return (
        <>
            <Text style={styles.title}>Products</Text>
            <ScrollView>
                {products.map(product => <Product key={product.id} {...product} />)}
            </ScrollView>
        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    title: {
        marginTop: 30,
        fontSize: 32,
        fontWeight: '700'
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        alignSelf: 'center',
        marginVertical: 6,
        marginTop: 30,
        marginBottom: 30
    }
})