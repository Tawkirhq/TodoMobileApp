import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default function Button({icon, title, backgroundColor, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onPress}>
      <Image source={icon} />
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}


