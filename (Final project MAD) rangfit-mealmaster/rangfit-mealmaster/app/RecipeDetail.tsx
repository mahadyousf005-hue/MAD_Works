import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function RecipeDetail() {
  const params = useLocalSearchParams();
  const recipe = JSON.parse(params.recipe as string);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>

      <Text style={styles.text}>🔥 Calories: {recipe.calories}</Text>
      <Text style={styles.text}>💪 Protein: {recipe.protein}</Text>
      <Text style={styles.text}>🥑 Fats: {recipe.fats}</Text>
      <Text style={styles.text}>🍞 Carbs: {recipe.carbs}</Text>

      <Text style={styles.subTitle}>Steps</Text>
      {recipe.steps.map((step: string, index: number) => (
        <Text key={index} style={styles.step}>
          {index + 1}. {step}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0A1F44' },
  title: { fontSize: 24, color: '#fff', marginBottom: 10 },
  subTitle: { fontSize: 18, color: '#FFD700', marginTop: 15 },
  text: { color: '#ccc', marginVertical: 4 },
  step: { color: '#fff', marginTop: 5 }
});