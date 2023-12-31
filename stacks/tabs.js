import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import FindScreen from "../screens/FindScreen";
import PostScreen from "../screens/PostScreen";
import SettingsScreen from "../screens/SettingsScreen";

import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity style={{top: -30, justifyContent: 'center', alignItems: 'center', ...styles.shadow}} onPress= {onPress}>
        <View style= {{width: 70, height: 70, borderRadius: 35, backgroundColor: '#AD40AF'}}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#ffffff',
                borderRadius: 15,
                height: 70,
                ...styles.shadow
            }
        })}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                unmountOnBlur: true,
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Icon name='home' size={25} color={focused ? '#AD40AF' : '#748c94'} />
                        <Text style={{ color: focused ? '#AD40AF' : '#748c94', fontSize: 12 }}>HOME</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Find" component={FindScreen} options={{
                unmountOnBlur: true,
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Icon name='add' size={25} color={focused ? '#AD40AF' : '#748c94'} />
                        <Text style={{ color: focused ? '#AD40AF' : '#748c94', fontSize: 12 }}>ADD</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Post" component={PostScreen} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <Icon name='amp-stories' size={30} color={'#ffffff'}  />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Icon name='chat-bubble-outline' size={25} color={focused ? '#AD40AF' : '#748c94'} />
                        <Text style={{ color: focused ? '#AD40AF' : '#748c94', fontSize: 12 }}>CHAT</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="Setting" component={SettingsScreen} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Icon name='settings' size={25} color={focused ? '#AD40AF' : '#748c94'} />
                        <Text style={{ color: focused ? '#AD40AF' : '#748c94', fontSize: 12 }}>SETTING</Text>
                    </View>
                ),
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
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

export default Tabs;