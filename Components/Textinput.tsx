import React from "react";
import { View, TextInput, StyleSheet, Text, TextStyle, KeyboardTypeOptions  } from "react-native";
import { Controller, FieldValues, FieldError } from "react-hook-form";
import { Ionicons } from '@expo/vector-icons'

interface TextInputProps {
  placeholder: string;
  label: string;
  icon?: string ;
  secureTextEntry?: boolean;
  control: any;
  name: string;
  rules: Object;
  error?: FieldError | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  maxLength?: number;
}

const Textinput: React.FC<TextInputProps> = ({
  placeholder,
  label,
  icon,
  secureTextEntry,
  control,
  name,
  rules,
  error,
  keyboardType,
  maxLength
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
      {icon && <Ionicons name={icon} size={20} style={styles.icon} />}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              value={value}
              placeholderTextColor="#170bee5e"
              keyboardType={keyboardType}
              maxLength={maxLength}
            />
          )}
          name={name}
          rules={rules}
          defaultValue=""
        />
      </View>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#495cc9",
    marginBottom: 5,
    borderRadius: 5,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#697add",
  },
  icon: {
    marginRight: 5,
    color: "#697add",
    padding: 5,
  },
  label: {
    color: "#697add",
    fontSize: 16,
    paddingBottom: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    paddingTop: 5,
  },
});

export default Textinput;
