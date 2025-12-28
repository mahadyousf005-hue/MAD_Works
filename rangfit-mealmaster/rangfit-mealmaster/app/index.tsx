import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { theme } from './theme';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TEMPORARY DUMMY LOGIN
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    // If fields are filled, move to Home
    router.replace('/Home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: 25, justifyContent: 'center' }}>

      <Text style={{ color: theme.text, fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>
        RangeFit Gym
      </Text>

      <Text style={{ color: theme.muted, textAlign: 'center', marginBottom: 40 }}>
        MealMaster App
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.muted}
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          padding: 15,
          borderRadius: 10,
          marginBottom: 15
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={theme.muted}
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          padding: 15,
          borderRadius: 10
        }}
      />

      <Pressable
        onPress={handleLogin}
        style={{
          backgroundColor: theme.primary,
          padding: 15,
          borderRadius: 10,
          marginTop: 25
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          Login
        </Text>
      </Pressable>

      <Text
        onPress={() => router.push('/Signup')}
        style={{ color: theme.muted, textAlign: 'center', marginTop: 20 }}
      >
        Create New Account
      </Text>

    </View>
  );
}