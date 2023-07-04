import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React from 'react'

export default function InputField({ placeholder, icon, inputType, keyboardType, fieldButtonLabel, fieldButtonFunction, onChangeText, defaultValue}) {
    return (
        <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', paddingBottom: 8, marginBottom: 25, borderBottomWidth: 1, }}>
            {icon}
            {inputType == 'password' ? <TextInput
                style={{
                    flex: 1,
                    paddingVertical: 0,
                }}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={true}
                placeholder={placeholder}
            /> :
                <TextInput
                    style={{
                        flex: 1,
                        paddingVertical: 0,
                    }}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />}
            <TouchableOpacity onPress={fieldButtonFunction}>
                <Text style={{ color: '#AD40AF', fontWeight: '700' }}>{fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
    );

}