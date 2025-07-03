import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginStudent } from '../../redux/slices/userSlice';
import { saveToken } from '../../utils/Storage';
import Button from '../reusable/Button';
import Input from '../reusable/Input';

const Enterpasscode = ({ open, setOen, data }) => {
    const dispatch = useDispatch()
    const [password, setPassword] = useState("")
    const close = () => {
        setOen(false)
    }
    console.log("dfsefsf", data?._id);
    const submit = async () => {
        const data = await dispatch(loginStudent({ id: data?._id, password: password }))
        console.log("data", data?.payload?.token)
        await saveToken(data?.payload?.token)
        router.push("(drawer)")
    }

    return (
        <Modal
            onRequestClose={close}
            visible={open}
            animationType="fade"
            transparent={true}
        >
            <KeyboardAvoidingView
                style={styles.backdrop}
            >
                <View style={styles.modalContent}>
                    <ImageBackground style={{ flex: 1, width: "100%" }} source={{ uri: "https://i.pinimg.com/736x/77/92/72/77927276e3388385c9f8e8e14a67a83b.jpg" }}>
                        <LinearGradient colors={["rgba(0, 0, 0, 0.62)", "rgba(0,0,0,0.5)"]} style={{ flex: 1, width: "100%", padding: 30 }}>
                            <Pressable onPress={close} style={styles.close}><Text>❌</Text></Pressable>
                            <View>
                                <Text style={styles.text}>Enter {data?.name} passcode</Text>
                                <Input
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="*** *** *** ***"
                                    secureTextEntry={true}
                                    showToggle={true}
                                />
                                <Text style={styles.forgottext}>Forgot Password</Text>
                                <View style={{ flexDirection: "row", alignSelf: "flex-end", marginTop: 20 }}>

                                    <Button title="SUBMIT" onPress={submit}/>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default Enterpasscode;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#d5d3d3',
        width: '100%', // fixed typo: "Width" → "width"
        alignItems: 'center',
        borderTopWidth: 2,
        borderColor: "#d5d3d3",
        height: 300
    },
    input: { backgroundColor: "#d5d3d3", borderRadius: 10, paddingHorizontal: 20 },
    text: { color: "#d5d3d3", marginBottom: 20, fontWeight: "bold", fontSize: 16 },
    close: {
        backgroundColor: "#d5d3d3", position: "absolute", right: 30, top: -50, borderRadius: 20, height: 40, width: 40, justifyContent: "center", alignItems: "center"
    },
    forgottext: {
        color: "#d5d3d3",
        textDecorationLine: "underline",
        marginTop: 10
    }
});
