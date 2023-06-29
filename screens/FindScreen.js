import React, { useState } from 'react';
import EmojiPicker from 'rn-emoji-keyboard';
import {
    View,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const FindScreen = ({ navigation: { goBack } }) => {
    const database = getFirestore();
    const [isOpen, setIsOpen] = useState(false);
    const [newItem, setNewItem] = useState({ emoji: '🚫', name: '', price: 0, isSold: false, createAt: new Date(), })

    const handlePick = (emojiObject) => {
        setNewItem({ ...newItem, emoji: emojiObject.emoji, })
    }

    const onSend = async () => {
        await addDoc(collection(database, 'products'), newItem).then(
            
            Alert.alert(
                'Notification',
                'Added',
                [
                    { text: "Close", onPress: () => goBack() },
                ],
                { cancelable: false }
        ),
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#fff', paddingHorizontal: 20 }}>
            <Text style={styles.title}>Add new products</Text>
            <Text style={styles.emoji} onPress={() => setIsOpen(true)}>{newItem.emoji}</Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <InputField onChangeText={(text) => setNewItem({ ...newItem, name: text })} placeholder={'Product name'} icon={<Icon name='drive-file-rename-outline' size={30} />} />
            <InputField onChangeText={(text) => setNewItem({ ...newItem, price: text })} placeholder={'$ Price'} icon={<Icon name='workspaces-outline' size={30} />} keyboardType='number-pad' />

            <CustomButton buttonLabel={'Add'} onPress={onSend} />
        </View>
    );
}

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

export default FindScreen;