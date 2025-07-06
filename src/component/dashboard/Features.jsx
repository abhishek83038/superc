import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'

const Features = () => {
  return (
    <View style={{flexDirection:"row",gap:"5%",padding:20}}>
      <View style={{alignItems:"center",width:"30%"}}>
        <Image source={{uri:"https://i.pinimg.com/736x/29/48/ef/2948ef02cab4aa7c13bf2aaa4dcf10f7.jpg"}} style={{height:80,width:80,borderRadius:50,elevation:10}}/>
        <View style={{backgroundColor:"#fff",width:"100%",height:70,borderRadius:20,marginTop:-30,zIndex:-1,justifyContent:"flex-end",alignItems:"center"}}>
            <Text style={{marginBottom:10,fontWeight:"bold"}}>Practice</Text>
        </View>
      </View>
      <View style={{alignItems:"center",width:"30%"}}>
        <Image source={{uri:"https://i.pinimg.com/736x/29/48/ef/2948ef02cab4aa7c13bf2aaa4dcf10f7.jpg"}} style={{height:80,width:80,borderRadius:50,elevation:10}}/>
        <View style={{backgroundColor:"#fff",width:"100%",height:70,borderRadius:20,marginTop:-30,zIndex:-1,justifyContent:"flex-end",alignItems:"center"}}>
            <Text style={{marginBottom:10,fontWeight:"bold"}}>Practice</Text>
        </View>
      </View>
      <View style={{alignItems:"center",width:"30%"}}>
        <Image source={{uri:"https://i.pinimg.com/736x/29/48/ef/2948ef02cab4aa7c13bf2aaa4dcf10f7.jpg"}} style={{height:80,width:80,borderRadius:50,elevation:10}}/>
        <View style={{backgroundColor:"#fff",width:"100%",height:70,borderRadius:20,marginTop:-30,zIndex:-1,justifyContent:"flex-end",alignItems:"center"}}>
            <Text style={{marginBottom:10,fontWeight:"bold"}}>Practice</Text>
        </View>
      </View>
    </View>
  )
}

export default Features

const styles = StyleSheet.create({})