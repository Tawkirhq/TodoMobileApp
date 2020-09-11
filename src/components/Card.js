import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card({ children, customStyle }) {
  return <View style={[styles.cardStyle, customStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 12,
    backgroundColor: "#fff",

    //android
    elevation: 2,

    //ios
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius:2
  },
});
