import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Header = ({ user }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.leftmenu}>
                <Pressable onPress={() => navigation.toggleDrawer()} style={styles.hambermenu}><Entypo name="menu" size={24} color="black" /></Pressable>
                <View>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>👋 Hello </Text>
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>{user?.name}</Text>
                </View>
            </View>
            <View style={styles.rightmenu}>
                <View style={styles.notification}><MaterialIcons name="notifications-none" size={24} color="black" /></View>
                <View style={{alignItems:"center"}}>
                    <View style={styles.notification}><FontAwesome6 name="user" size={20} color="black" /></View>
                    <Text style={{color:"#ddd"}}>{user?.isParent ? "Parent" : "Student"}</Text>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 40,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    hambermenu: {
        backgroundColor: "#fff",
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    },
    leftmenu: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    rightmenu: {
        flexDirection: "row",
        // alignItems:"center",
        gap: 15
    },
    notification: {
        backgroundColor: "#fff",
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15
    }
})