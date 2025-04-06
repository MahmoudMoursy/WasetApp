import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BottomNav = ({ navigation }) => {
    return (
        <View style={[styles.bottomNav,{flex:1}]}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome5 name="home" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('')}>
                <FontAwesome5 name="cogs" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('')}>
                <FontAwesome5 name="user" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Donation')}>
                <FontAwesome5 name="heart" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#091E3D',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
    },
    
});

export default BottomNav;
