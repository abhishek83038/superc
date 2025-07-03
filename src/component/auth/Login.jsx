import { Image, ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { login, loginStudent } from '../../redux/slices/userSlice'; // Adjust the import path as necessary
import { IMAGE_URL } from '../../utils/common'
import { saveToken } from '../../utils/Storage'
import Button from '../reusable/Button'
import Enterpasscode from './Enterpasscode'

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profiles, setProfiles] = useState([]);

    const [visible, setvisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});


    const handleLogin = async () => {
        if (!email || !password) return;
        const data = await dispatch(login({ email, password }));
        setProfiles(data?.payload?.profiles)
        // setPassword("")
        setEmail("")
        setvisible(true)
    };

    const finalLogin = async (profile) => {
        if (profile?.role === "PARENT") {
            const data = await dispatch(loginStudent({ id: profile?._id, password: password }))
            console.log("firstsefese",data)
            await saveToken(data?.payload?.token)
            setProfiles([])
            router.push("/(drawer)")
        }
        else {
            setData(profile)
            setOpen(true)
        }
    }

    return (
        <ImageBackground style={{ flex: 1, width: "100%" }} resizeMode='stretch' source={{ uri: "https://i.pinimg.com/736x/7f/9a/76/7f9a7639207d435dde54466c93828f84.jpg" }}>
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={{ flex: 1, paddingTop: "20%", padding: "10%", borderRadius: 10 }}>
                <Image source={require("../../../assets/images/loginboy.png")} style={{ width: 100, height: 150, resizeMode: "contain", alignSelf: "center" }} />
                <Text style={{ color: "#d5d3d3", fontSize: 30, textAlign: "center" }}>WELCOME BACK</Text>
                <Text style={{ color: "#d5d3d3", fontSize: 20, textAlign: "center", marginBottom: 20 }}>LOGIN</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry />
                <View style={{ width: 200, alignSelf: "center", marginTop: 40 }}>
                    <Button loading={loading} disabled={!email || !password || loading} title="LOGIN" onPress={handleLogin} />
                </View>

                <Modal onRequestClose={() => setvisible(false)} visible={visible && profiles?.length > 0} animationType='fade'>
                    <ImageBackground source={{ uri: "https://i.pinimg.com/736x/22/d4/b1/22d4b139726fab5b2dd4b4434a322895.jpg" }} style={{ flex: 1, padding: 50 }} resizeMode='stretch'>
                        <Text style={{ color: "#d5d3d3", fontSize: 25, marginTop: 150, marginBottom: 20, textAlign: "center" }}>Choose Profile to Login</Text>
                        <View style={{ height: 480, marginLeft: 10 }}>
                            <ScrollView>
                                {profiles?.length > 0 && !loading && (
                                    <View >
                                        {profiles.map(profile => <Pressable onPress={() => finalLogin(profile)} key={profile._id} style={styles.profilewrap}>
                                            {profile?.profile ?
                                                <Image source={{ uri: `${IMAGE_URL}${profile?.profile}` }} style={styles.profile} /> :
                                                <Image source={{ uri: `https://i.pinimg.com/736x/04/1b/68/041b68a460d7627240d4e0e181b50b15.jpg` }} style={styles.profile} />}
                                            <View>
                                                <Text style={{ color: "#d5d3d3", fontSize: 16 }}> {profile.name} </Text>
                                                <Text style={{ color: "#ccc", fontSize: 12, marginTop: 5 }}> {profile?.role} </Text>
                                            </View>
                                        </Pressable>)}

                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </Modal>

                <Enterpasscode open={open} setOen={setOpen} data={data} />

            </LinearGradient>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    input: { borderWidth: 2, borderColor: "#d5d3d3", borderRadius: 10, padding: 10, color: "#000", backgroundColor: "#d5d3d3" },
    label: { fontSize: 14, color: "#d5d3d3", marginLeft: 10, marginBottom: 5, marginTop: 20 },
    profile: { height: 80, width: 80, borderRadius: 50, borderWidth: 1, borderColor: "#d5d3d3" },
    profilewrap: {
        borderBottomWidth: 2, borderColor: "#d5d3d3", paddingVertical: 20,
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    }
})