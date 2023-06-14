import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomButton({buttonLabel, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    backgroundColor: '#AD40AF',
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
                    {buttonLabel}
                </Text>
            </View>
        </TouchableOpacity>);
}