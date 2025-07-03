import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Drawer() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="(tab)"><Text>dashboard</Text></Link>
    </View>
  );
}
