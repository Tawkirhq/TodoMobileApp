import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
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

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = () => {
    if (!email || !password) {
      return Alert.alert("Error", "You need to fill all the Input");
    }

    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("res", res);
        setLoading(false);

        const uid = res.user.uid;

        const userProfileData = {
          id: uid,
          email: email,
        };

        const userRef = firebase.firestore().collection("users");

        userRef.doc(uid).set(userProfileData);
      })
      .catch((error) => {
        console.log("err", error);
        alert(error);
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
            <Button title="LOGIN" onPress={signup} backgroundColor="#FFE600" />
          </View>
        )}
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ padding: 20 }}>
          <Text>
            Already have an account? <Text style={{ color: "blue" }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
