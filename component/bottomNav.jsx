import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BottomNav = ({ navigation }) => {
    return (
        <View style={[styles.bottomNav,]}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome5 name="home" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Housing')}>
                <FontAwesome5 name="building" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.activeButton}><FontAwesome5 name="user" size={24} color="white" /></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Tourise')}>
                <FontAwesome5 name="globe" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Community')}>
                <FontAwesome5 name="users" size={24} color="white" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
        backgroundColor: '#091E3D',
        position: "absolute",
        bottom: 0,
        height: 70,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },

    activeButton: {
        backgroundColor: '#091E3D',
        width: 65,
        height: 65,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -35,
        left: '50%',
        marginLeft: -32.5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
        borderWidth: 4,
        borderColor: '#091E3D',
        transition: 'transform 0.3s ease-in-out',
    },

    buttonPressEffect: {
        transform: [{ scale: 0.95 }],
    }
});

export default BottomNav;
