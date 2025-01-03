import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { Response, User } from '@/constants/type';
import { useEffect, useState } from 'react';

async function getFollowers(username: string) {
  const response = await fetch(`/api/followers?name=${username}`);
  const data = await response.json() as Response<User[]>;
  return data;
}

export default function ModalScreen() {
  const { username } = useLocalSearchParams();
  const [followers, setFollowers] = useState<User[] | null>(null);

  async function requestFollowers(username: string) {
    const response = await getFollowers(username);
    if (response.status === 'failure') {
      setFollowers(null);
      return;
    } 
    setFollowers(response.res);
  }

  useEffect(() => {
    if (typeof username !== 'string') return;
    requestFollowers(username);
  }, [username]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {followers?.map((follower, index) => (
          <Text key={`${follower.id}-${index}`} style={styles.title}>{follower.login}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
