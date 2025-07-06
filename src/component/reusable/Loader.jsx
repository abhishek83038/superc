import { StyleSheet, Text, View } from 'react-native'

const Loader = () => {
  return (
    <View style={styles.container}>
      <Text>Loader</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#000",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})