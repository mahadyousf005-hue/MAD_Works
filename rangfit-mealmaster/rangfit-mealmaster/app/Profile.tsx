import { Text, View } from 'react-native';
import { theme } from './theme';

export default function Profile() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: 20 }}>
      <Text style={{ color: theme.text, fontSize: 22 }}>My Profile</Text>
      <Text style={{ color: theme.muted, marginTop: 10 }}>
        Name: Gym Member
      </Text>
      <Text style={{ color: theme.muted }}>
        Goal: Muscle Gain
      </Text>
    </View>
  );
}
