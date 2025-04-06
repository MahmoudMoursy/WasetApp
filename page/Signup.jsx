import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../story/authstorre';
import { useNavigation } from '@react-navigation/native';
import wasetLogo from '../assets/waset.png';

const schema = z.object({
  name: z.string().min(7, "Name must be more than 7 characters").max(20, 'Name must be less than 15 characters'),
  email: z.string().email("Invalid email address"),
  pass: z.string().min(10, "Password must be more than 10 characters").max(20, 'Password must be less than 20 characters'),
  confirmpass: z.string()
}).refine((data) => data.pass === data.confirmpass, {
  message: "Password and confirm password don't match",
  path: ["confirmpass"],
});

const Signup = () => {
  const authStore = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  async function save(data) {
    setLoading(true);
    setSignupError("");

    try {
      await authStore.signUp({
        name: data.name,
        email: data.email,
        password: data.pass
      });

      navigation.replace('Login'); 
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError("Failed to sign up. Please try again.");
    }

    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
        <Image source={wasetLogo} style={styles.logo} />
        <View style={styles.form}>
          <Text style={styles.title}>Please Sign Up To Continue To App</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonNav}>
            <Text style={styles.navButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNavActive}>
            <Text style={styles.navButtonTextt}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput {...register('name')} style={styles.input} placeholder="Enter your name" />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput {...register('email')} style={styles.input} placeholder="Enter your email" keyboardType="email-address" />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput {...register('pass')} style={styles.input} placeholder="Enter your password" secureTextEntry />
            {errors.pass && <Text style={styles.errorText}>{errors.pass.message}</Text>}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput {...register('confirmpass')} style={styles.input} placeholder="Confirm your password" secureTextEntry />
            {errors.confirmpass && <Text style={styles.errorText}>{errors.confirmpass.message}</Text>}
          </View>

          {signupError && <Text style={styles.errorText}>{signupError}</Text>}

          <TouchableOpacity onPress={handleSubmit(save)} style={styles.submitButton} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitButtonText}>Sign Up</Text>}
          </TouchableOpacity>

          <Text style={styles.loginText}>I have an account <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091E3D',
    padding: 20,
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
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  buttonNav: {
    backgroundColor: '#D8DCDC',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonNavActive: {
    backgroundColor: '#091E3D',
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  navButtonTextt: {
    color: '#FFFFFFFF',
    fontWeight: 'bold',
  },
  navButtonText: {
    color: '#091E3D',
    fontWeight: 'bold',
  },
  label: {
    color: 'gray',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#091E3D',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default Signup;
