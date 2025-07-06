import { Image, ScrollView, StyleSheet } from 'react-native';

const Slider = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <Image
        source={{ uri: "https://www.98thpercentile.com/hubfs/401x226%20(7).png" }}
        style={styles.image}
      />
      <Image
        source={{ uri: "https://www.studiestoday.com/sites/default/files/blogimages/olympia%20class%202%20mathematics_1.jpg" }}
        style={styles.image}
      />
    </ScrollView>
  );
};

export default Slider;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
  },
  image: {
    width: 300,
    height: 150,
    margin: 10,
    borderRadius: 10,
  },
});
