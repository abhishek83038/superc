import { userInfo } from "@/src/redux/slices/userSlice";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Features from "../../src/component/dashboard/Features";
import Header from "../../src/component/dashboard/Header";
import Slider from "../../src/component/dashboard/Slider";
import Loader from "../../src/component/reusable/Loader";

export default function Drawer() {
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const initapi = async() => {
     await dispatch(userInfo())
    }
    initapi()
  }, [dispatch])

  if (user?.isLoading){
    return <Loader/>
  }
  return (
    <ImageBackground style={{flex:1}} source={{uri:"https://i.pinimg.com/736x/83/96/2e/83962e7d00e44cc815d0daf8faf3f693.jpg"}}>
      <LinearGradient colors={["rgba(0,0,0,0.8)","rgba(0, 150, 246, 0.7)"]} style={{flex:1}}>
      <Header user={user}/>
    <ScrollView>
      <Slider/>
      <Features/>
    </ScrollView>
    </LinearGradient>
    </ImageBackground>
  );
}
