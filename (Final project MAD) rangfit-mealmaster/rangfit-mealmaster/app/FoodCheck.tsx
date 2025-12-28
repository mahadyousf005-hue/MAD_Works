import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { theme } from './theme';

export default function FoodCheck() {
  const [food, setFood] = useState('');

  const nonVegan = ['egg', 'meat', 'chicken', 'fish', 'milk'];

  const result = food
    ? nonVegan.includes(food.toLowerCase())
      ? '❌ Non-Vegan'
      : '✅ Vegan'
    : '';

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: 20 }}>
      <Text style={{ color: theme.text, fontSize: 22 }}>Food Checker</Text>

      <TextInput
        placeholder="Enter food name"
        placeholderTextColor={theme.muted}
        onChangeText={setFood}
        style={{
          backgroundColor: theme.card,
          padding: 15,
          color: theme.text,
          borderRadius: 10,
          marginTop: 20
        }}
      />

      <Text style={{ color: theme.primary, fontSize: 24, marginTop: 20 }}>
        {result}
      </Text>
    </View>
  );
}
