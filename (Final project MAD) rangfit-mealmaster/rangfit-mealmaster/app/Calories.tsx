import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Calories() {
  const [food, setFood] = useState('');
  const [result, setResult] = useState<any>(null);

  // ✅ Trainer food data (PUT HERE)
  const foodData = {
    chicken: { calories: 165, protein: 31, advice: "Excellent for lean muscle gain 💪" },
    egg: { calories: 155, protein: 13, advice: "Great protein source. Eat after workout 🏋️" },
    oats: { calories: 389, protein: 17, advice: "Perfect for energy & bulking 🔥" },
    banana: { calories: 105, protein: 1, advice: "Good pre-workout food ⚡" },
    peanutbutter: { calories: 588, protein: 25, advice: "High calories – great for weight gain 🥜" },
    rice: { calories: 130, protein: 2, advice: "Good carbs for muscle recovery 🍚" }
  };

  const checkCalories = () => {
  const key = food
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '');

  setResult(foodData[key] || null);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Calories Trainer</Text>

      <TextInput
        placeholder="Enter food (e.g. chicken)"
        value={food}
        onChangeText={setFood}
        onSubmitEditing={checkCalories}
        style={styles.input}
      />

      {result ? (
        <View style={styles.card}>
          <Text>Calories: {result.calories} kcal</Text>
          <Text>Protein: {result.protein} g</Text>
          <Text>{result.advice}</Text>
        </View>
      ) : (
        food !== '' && <Text style={{ color: 'red' }}>Food not found ❌</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1F44',
    padding: 20
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 15
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10
  }
});