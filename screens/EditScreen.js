import React, { useState } from 'react';
import EmojiPicker from 'rn-emoji-keyboard';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity
} from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const EditScreen = ({ route }) => {
    const navigation = useNavigation();
    const database = getFirestore();
    const data = route.params.paramKey;
    const [isOpen, setIsOpen] = useState(false);
    const [currentItems, setNewItem] = useState({ id: data.id, emoji: data.emoji, name: data.name, price: data.price})

    const handlePick = (emojiObject) => {
        setNewItem({ ...currentItems, emoji: emojiObject.emoji, })
    }

    const onSubmit = () => {
        const docRef = doc(database, 'products', currentItems.id);
        updateDoc(docRef, {
            emoji: currentItems.emoji,
            name: currentItems.name,
            price: currentItems.price,
        }).then(() => {
            Alert.alert(
                'Notification',
                'Edited',
                [
                    { text: "Close", onPress: () => navigation.goBack() },
                ],
                { cancelable: false }
            );
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#fff', paddingHorizontal: 20 }}>
            <TouchableOpacity style={styles.backButtonBG}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-ios" size={20} color='#ffffff' />
            </TouchableOpacity>
            <Text style={styles.title}>Edit product</Text>
            <Text style={styles.emoji} onPress={() => setIsOpen(true)}>{currentItems.emoji}</Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <InputField onChangeText={(text) => setNewItem({ ...currentItems, name: text })} defaultValue={currentItems.name} placeholder={'Product name'} icon={<Icon name='drive-file-rename-outline' size={30} />} />
            <InputField onChangeText={(text) => setNewItem({ ...currentItems, price: text })} defaultValue={currentItems.price} placeholder={'$ Price'} icon={<Icon name='workspaces-outline' size={30} />} keyboardType='number-pad' />

            <CustomButton buttonLabel={'Submit'} onPress={onSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        paddingTop: 40,
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
    },
    backButtonBG: {
        marginLeft: 10,
        paddingLeft: 10,
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 50,
        opacity: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#E1E2E6',
    },
})

export default EditScreen;