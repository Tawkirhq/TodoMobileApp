import React, { useState } from "react";
import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Button from "../components/Button";
import { firebase } from "../firebase/config";

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 25,
    marginTop: 60,
  },
  input: {
    height: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 30,
  },
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (!email || !password) {
      return Alert.alert("Error", "You need to fill all the Input");
    }
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("response", res);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ alignSelf: "center", marginTop: 120 }}>
        <Image source={require("../../assets/undraw_walking.png")} />
      </View>

      <View style={styles.form}>
        <TextInput onChangeText={(text) => setEmail(text)} placeholder="Email" style={styles.input} />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ width: "50%", alignSelf: "center" }}>
            <Button title="LOGIN" onPress={login} backgroundColor="#FFE600" />
          </View>
        )}
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={{ padding: 20 }}>
          <Text>
            Don't have an account? <Text style={{ color: "blue" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
