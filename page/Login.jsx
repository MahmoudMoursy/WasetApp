import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../story/authstorre';
import wasetLogo from '../assets/waset.png';
import google from '../assets/google.png';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

function Login() {
    const nav = useNavigation();
    const AuthStore = useAuth();
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function save() {
        setLoading(true);
        setError("");

        try {
            await AuthStore.login(user);
            nav.navigate('Home', { state: { data: "hi from login" } });
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }

        setLoading(false);
    }

    function handleInputChange(name, value) {
        setUser(prev => ({ ...prev, [name]: value }));
    }

   
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in", user.uid);
        } else {
            console.log("User is not signed in");
        }
    });

    async function handleGoogleLogin() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            await signInWithPopup(auth, provider);
            nav.navigate('Home');
        } catch (error) {
            setError("Google login failed. Please try again.");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={wasetLogo} style={styles.logo} />
            </View>

            <View style={styles.form}>             
                <Text style={styles.title}>Welcome back! Please enter your details.</Text>
                <View style={styles.buttonNav}>
                    <TouchableOpacity onPress={() => nav.navigate('SignUp')} style={styles.navButton}>
                        <Text style={styles.navButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButtonActive}>
                        <Text style={styles.navButtonTextt}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={user.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={user.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry
                />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleButton}>
                    <Image source={google} style={styles.googleIcon} />
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={save} style={styles.submitButton} disabled={loading}>
                    {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitButtonText}>Login</Text>}
                </TouchableOpacity>

                <Text style={styles.signUpText}>
                    Don’t have an account?{' '}
                    <Text onPress={() => nav.navigate('SignUp')} style={styles.signUpLink}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'linear-gradient(97deg, rgba(9,30,61,1) 70%, rgba(255,255,255,1) 95%)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 380,
        height: 150,
        marginBottom: 20,
    },
    title: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
    form: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    buttonNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    navButton: {
        backgroundColor: '#D8DCDC',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    navButtonActive: {
        backgroundColor: '#091E3D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    navButtonText: {
        color: '#091E3D',
        fontWeight: 'bold',
    },
    navButtonTextt: {
        color: '#FFFFFFFF',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DCDCDC',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 15,
        textAlign: 'center',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DB4437',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
    },
    googleIcon: {
        width: 20,
        height: 20,
    },
    googleButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#091E3D',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    signUpText: {
        textAlign: 'center',
        color: 'gray',
        fontWeight: 'bold',
    },
    signUpLink: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});

export default Login;
