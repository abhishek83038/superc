import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

const Button = ({
  title,
  onPress,
  backgroundColor = '#007bff',
  textColor = '#d5d3d3',
  borderRadius = 10,
  style,
  textStyle,
  disabled = false,
  loading
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {loading&&<ActivityIndicator color="#d5d3d3" style={{margin:70}}/>}{loading?"Loading...":title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
