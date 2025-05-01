import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../story/authstorre';
import { useNavigation } from '@react-navigation/native';
import wasetLogo from '../assets/waset.png';

const schema = z.object({
  name: z.string()
    .min(3, "يجب أن يكون الاسم أكثر من 3 أحرف")
    .max(30, 'يجب أن يكون الاسم أقل من 30 حرفاً'),
  email: z.string()
    .email("البريد الإلكتروني غير صالح"),
  pass: z.string()
    .min(8, "يجب أن تكون كلمة المرور أكثر من 8 أحرف")
    .max(20, 'يجب أن تكون كلمة المرور أقل من 20 حرفاً')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص"),
  confirmpass: z.string()
    .min(8, "يجب أن تكون كلمة المرور أكثر من 8 أحرف")
    .max(20, 'يجب أن تكون كلمة المرور أقل من 20 حرفاً')
}).refine((data) => data.pass === data.confirmpass, {
  message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
  path: ["confirmpass"],
});

const Signup = () => {
  const authStore = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const { control, handleSubmit, formState: { errors } } = useForm({
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
      if (error.code === 'auth/email-already-in-use') {
        setSignupError("البريد الإلكتروني مستخدم بالفعل");
      } else if (error.code === 'auth/weak-password') {
        setSignupError("كلمة المرور ضعيفة جداً");
      } else {
        setSignupError("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى");
      }
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
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your name"
                />
              )}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="pass"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your password"
                  secureTextEntry
                />
              )}
            />
            {errors.pass && <Text style={styles.errorText}>{errors.pass.message}</Text>}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Confirm Password</Text>
            <Controller
              control={control}
              name="confirmpass"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirm your password"
                  secureTextEntry
                />
              )}
            />
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
