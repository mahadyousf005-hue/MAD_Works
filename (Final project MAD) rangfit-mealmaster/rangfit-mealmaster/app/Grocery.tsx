import { StyleSheet, Text, View } from 'react-native';

export default function Grocery() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Grocery List</Text>

      <Text style={styles.item}>✔ Brown Rice</Text>
      <Text style={styles.item}>✔ Chickpeas</Text>
      <Text style={styles.item}>✔ Spinach</Text>
      <Text style={styles.item}>✔ Olive Oil</Text>
      <Text style={styles.item}>✔ Oats</Text>

      <Text style={styles.note}>
        This list is auto-generated from your selected recipes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  item: { fontSize: 18, marginVertical: 5 },
  note: { marginTop: 20, fontSize: 14, color: 'gray' }
});
