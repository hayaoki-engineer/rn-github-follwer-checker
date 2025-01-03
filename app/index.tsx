import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { View } from "@/components/Themed";
import { Link } from "expo-router";
import { Response, User } from "@/constants/type";

/* API連携 */
async function getUser(userName: string) {
  // APIエンドポイントにGETリクエストを送信
  const response = await fetch(`/api/user?name=${userName}`);
  const data = (await response.json()) as Response<User>;
  return data;
}

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUser, setSearchedUser] = useState<User | null>(null);

  const onPressSearch = async () => {
    const userResponse = await getUser(searchTerm.toLocaleLowerCase());
    if (userResponse.status === 'failure') {
      Alert.alert(userResponse.message);
      setSearchedUser(null);
      return;
    }

    setSearchedUser(userResponse.res);
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.nativeEvent.text)}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#000",
          width: 150,
          fontSize: 24,
          fontWeight: "500",
          marginBottom: 24,
          textAlign: "center",
        }}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          borderWidth: 1,
          borderRadius: 18,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginBottom: 40,
        }}
        onPress={onPressSearch}
      >
        Search
      </Text>
      
      {searchedUser?.avatar_url ? (
        <Link href={`/${searchedUser.login}`} asChild>
          <Pressable>
            <Image
              source={{ uri: searchedUser.avatar_url }}
              style={{ width: 200, height: 200, borderRadius: 60 }}
            />
          </Pressable>
        </Link>
      ) : (
        <View
          style={{ width: 200, height: 200, borderRadius: 60, borderWidth: 1 }}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
