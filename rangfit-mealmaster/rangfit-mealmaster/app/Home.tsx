import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { theme } from './theme';

export default function Home() {
  const router = useRouter();

  const Card = ({ title, route }) => (
    <Pressable
      onPress={() => router.push(route)}
      style={{
        backgroundColor: theme.card,
        padding: 20,
        borderRadius: 15,
        marginBottom: 15
      }}
    >
      <Text style={{ color: theme.text, fontSize: 18 }}>
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: 20 }}>
      <Text style={{ color: theme.text, fontSize: 26, marginBottom: 20 }}>
        Dashboard
      </Text>

      <Card title="🥗 Food Check" route="/FoodCheck" />
      <Card title="🍳 Recipes" route="/Recipes" />
      <Card title="🛒 Grocery List" route="/Grocery" />
      <Card title="🔥 Calories Tracker" route="/Calories" />
      <Card title="👤 Profile" route="/Profile" />
    </View>
  );
}
