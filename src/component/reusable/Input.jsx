import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

const Input = ({
  value,
  onChangeText,
  placeholder = 'Enter text',
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  rightIcon = null,    // e.g. 'mail', 'person'
  showToggle = false,  // only for password toggle
  ...props
}) => {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          placeholderTextColor="#888"
          style={[
            styles.input,
            style,
            { paddingRight: 45 }, // always reserve space for right icon
          ]}
          {...props}
        />

        <Pressable
          style={styles.rightIcon}
          onPress={() => {
            if (showToggle) setHidden(!hidden);
          }}
          disabled={!showToggle}
        >
          <Ionicons
            name={
              showToggle
                ? hidden
                  ? 'eye-off'
                  : 'eye'
                : rightIcon || 'information-circle-outline'
            }
            size={22}
            color="#555"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: 8,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.77)",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    top: 14,
  },
});
