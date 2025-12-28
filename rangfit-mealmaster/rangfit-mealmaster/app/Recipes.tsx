import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const recipes = [
  {
    id: 1,
    name: 'Chicken Breast Bowl',
    calories: 450,
    protein: '40g',
    fats: '10g',
    carbs: '30g',
    steps: [
      'Grill chicken breast',
      'Add brown rice',
      'Mix with veggies'
    ]
  },
  {
    id: 2,
    name: 'Vegan Protein Salad',
    calories: 350,
    protein: '25g',
    fats: '8g',
    carbs: '40g',
    steps: [
      'Boil chickpeas',
      'Add vegetables',
      'Mix with olive oil'
    ]
  },
  {
    id: 3,
    name: 'Oats & Peanut Butter',
    calories: 500,
    protein: '20g',
    fats: '18g',
    carbs: '60g',
    steps: [
      'Cook oats in milk',
      'Add peanut butter',
      'Top with banana'
    ]
  }
];

export default function Recipes() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🥗 Gym Recipes</Text>

      {recipes.map(recipe => (
        <TouchableOpacity
          key={recipe.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/RecipeDetail',
              params: { recipe: JSON.stringify(recipe) }
            })
          }
        >
          <Text style={styles.name}>{recipe.name}</Text>
          <Text>Calories: {recipe.calories}</Text>
          <Text>Protein: {recipe.protein}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0A1F44' },
  title: { fontSize: 22, color: '#fff', marginBottom: 15 },
  card: {
    backgroundColor: '#132F5E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12
  },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});