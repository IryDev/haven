import { Link } from "expo-router";
import { Text, View } from "react-native";


export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>This is a text in ios</Text>
      <Link href="/notifications">notification</Link>
    </View>
  );
}
