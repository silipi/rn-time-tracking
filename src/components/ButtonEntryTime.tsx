import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonEntryTime = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>Registrar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#7832d3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
  },
});

export default ButtonEntryTime;
