import Feather from '@expo/vector-icons/Feather';
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { getCountryList } from "../src/services/countryServices";
import { colors } from "../src/utils/color";
import { saveCountry } from "../src/utils/Storage";

export default function Selectcountry() {
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [bgImage, setbgImage] = useState("https://i.pinimg.com/736x/69/1b/a4/691ba49b72ab9ad76f831a7ff34fc05f.jpg");

  const initApi = async () => {
    setLoading(true);
    try {
      const data = await getCountryList();
      setCountryList(data);
    } catch (error) {
      console.log("Error fetching country list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initApi();
  }, []);

  useEffect(()=>{
    if (selectedCountry?.code=="IN") {
      setbgImage(`https://i.pinimg.com/736x/79/3f/ec/793fecb0551786b132650c93d34c3188.jpg`);
    } else if (selectedCountry?.code=="US") {
      setbgImage(`https://i.pinimg.com/736x/68/4c/f1/684cf19be1d89a882a3875b36bb6b9af.jpg`);
    } else if (selectedCountry?.code=="GB") { 
      setbgImage(`https://i.pinimg.com/736x/71/15/bb/7115bb18d7feb4dd76a3f5f2bf31415d.jpg`);
    }

  },[selectedCountry])

  const handleCountrySelect = async () => {
    if (selectedCountry) {
      await saveCountry(selectedCountry);
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: bgImage,
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.7)"]} style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={{ color: "#d5d3d3", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Select Your Country</Text>
            {countryList?.map((val) => (
              <Pressable
                key={val._id}
                onPress={() => setSelectedCountry(val)}
                style={[
                  styles.option,
                  selectedCountry?._id === val._id && styles.optionSelected,
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: `https://flagcdn.com/w40/${val.code.toLowerCase()}.png` }}
                    style={styles.flag}
                  />
                  <Text style={[styles.optionText, selectedCountry?._id === val._id && styles.textselected,]}>{val.name}</Text>
                </View>
                <View>{selectedCountry?._id === val._id && <Feather name="check-circle" size={24} color="black" />}</View>
              </Pressable>
            ))}
            <Button
              buttonColor={colors.maincolor}
              mode="contained"
              onPress={handleCountrySelect}
              disabled={!selectedCountry}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              CONTINUE
            </Button>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#d5d3d3",
    fontSize: 18,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    // alignItems: "center",
  },
  scroll: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "space-between",
    borderWidth: 2,
    borderColor: "#d5d3d3",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 6,
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  optionSelected: {
     flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#d5d3d3",
    borderColor: "#d5d3d3",
  },
  flag: {
    width: 40,
    height: 30,
    borderRadius: 5,
    marginRight: 15,
  },
  optionText: {
    color: "#d5d3d3",
    fontSize: 14,
    fontWeight: "600",
  },
  textselected: {
    color: "#000"
  },
  button: {
    marginTop: 40,
    width: "50%",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
  },
});
