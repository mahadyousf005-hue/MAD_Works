// App.js - Single-file Expo React Native app with multiple screens
// Paste this in your App.js and run with `expo start`

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Dummy data
const initialOffers = [
  { id: '1', title: 'Python Tutoring', user: 'Ali', description: 'Python basics to intermediate.' },
  { id: '2', title: 'Guitar Lessons', user: 'Fatima', description: 'Learn guitar chords and songs.' },
  { id: '3', title: 'Drawing Basics', user: 'Ahmed', description: 'Digital/Traditional drawing lessons.' },
];

// ---------- Login ----------
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!email || !password) return Alert.alert('Error', 'Email aur password likho');
    const user = { name: 'Test User', skills: ['React Native','Guitar'], bio:'A passionate learner.' };
    navigation.replace('Home', { user });
  };

  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.title}>SkillSwap</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={onLogin} />
    </SafeAreaView>
  );
}

// ---------- Home ----------
function HomeScreen({ navigation, route }) {
  const [offers, setOffers] = useState(initialOffers);
  const user = route.params?.user ?? { name: 'Guest' };

  const onAddOffer = (offer) => {
    setOffers(prev => [{ ...offer, id: String(Date.now()) }, ...prev]);
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {user.name}</Text>
        <Button title="Profile" onPress={() => navigation.navigate('Profile', { user })} />
      </View>

      <FlatList
        data={offers}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('OfferDetails', { offer: item })}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSub}>By {item.user}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{padding:12}}
      />

      <View style={{padding:12}}>
        <Button title="Create Offer" onPress={() => navigation.navigate('CreateOffer', { onAddOffer })} />
      </View>
    </SafeAreaView>
  );
}

// ---------- Create Offer ----------
function CreateOfferScreen({ navigation, route }) {
  const onAddOffer = route.params?.onAddOffer;
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');

  const submit = () => {
    if (!title || !desc) return Alert.alert('Error','Title aur description required');
    const offer = { title, description: desc, user:'You' };
    if(onAddOffer) onAddOffer(offer);
    Alert.alert('Posted','Offer successfully added!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex:1,padding:16}}>
      <ScrollView>
        <Text style={styles.h1}>Create Offer</Text>
        <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
        <TextInput placeholder="Description" style={[styles.input,{height:100}]} value={desc} onChangeText={setDesc} multiline />
        <Button title="Post Offer" onPress={submit} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Offer Details ----------
function OfferDetailsScreen({ route }) {
  const offer = route.params?.offer;
  return (
    <SafeAreaView style={{flex:1,padding:16}}>
      <Text style={styles.h1}>{offer.title}</Text>
      <Text style={{marginBottom:8}}>By: {offer.user}</Text>
      <Text>{offer.description}</Text>
      <Button title="Book Session" onPress={() => Alert.alert('Booked', `You booked ${offer.title}`)} />
    </SafeAreaView>
  );
}

// ---------- Profile ----------
function ProfileScreen({ route }) {
  const user = route.params?.user ?? { name:'Guest', skills:[], bio:'' };
  return (
    <SafeAreaView style={{flex:1,padding:16}}>
      <Text style={styles.h1}>{user.name}</Text>
      <Text>{user.bio}</Text>
      <Text style={{marginTop:12,fontWeight:'bold'}}>Skills:</Text>
      {user.skills.length === 0 ? <Text>No skills added</Text> : user.skills.map((s,i)=><Text key={i}>- {s}</Text>)}
    </SafeAreaView>
  );
}

// ---------- App ----------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateOffer" component={CreateOfferScreen} />
        <Stack.Screen name="OfferDetails" component={OfferDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  center:{flex:1,justifyContent:'center',padding:20},
  title:{fontSize:28,textAlign:'center',marginBottom:20},
  input:{borderWidth:1,borderRadius:6,padding:10,marginBottom:12},
  header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:12,backgroundColor:'#f2f2f2'},
  headerText:{fontSize:16,fontWeight:'600'},
  card:{padding:12,backgroundColor:'#fff',borderWidth:1,borderColor:'#ddd',borderRadius:6},
  cardTitle:{fontSize:16,fontWeight:'bold'},
  cardSub:{fontSize:13,color:'#555'},
  h1:{fontSize:22,fontWeight:'bold',marginBottom:12}
});
 "