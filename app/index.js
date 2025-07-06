import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../src/utils/color";
// 

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 100
      }}
    >
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/4b/c8/a1/4bc8a1873b16f428b6c209a09bdd9165.jpg",
        }}
        style={styles.background}
        contentFit="cover"
      >
        <LinearGradient colors={["rgba(0, 0, 0, 0.2)", "rgba(0,0,0,0.7)"]} style={styles.overlay}>
          <Text style={{color:"#d5d3d3",textAlign:"center",marginVertical:20}}>SuperC provides you Unlimited Practice, Competitive Battles, Olympiad,
            Automated Homework & Assignments to growth your child brain.</Text>
          <Link style={styles.loginbtn} href="/login"><Text>LOGIN / REGISTER</Text></Link>
          <Link style={styles.guestbtn} href="/(drawer)"><Text>OPEN AS GUEST</Text></Link>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    padding: 40,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  loginbtn: {
    backgroundColor: "#0096F6",
    padding:10,
    borderRadius: 10,
    textAlign: "center",
    color: "#d5d3d3",
    fontSize: 14,
    fontWeight: "bold",
  },
  guestbtn: {
    padding:10,
    marginTop:20,
    borderRadius: 10,
    textAlign: "center",
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor:colors.maincolor,
    color:colors.maincolor,
  },
})
