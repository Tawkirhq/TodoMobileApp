import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import Button from "../components/Button";
import { firebase } from "../firebase/config";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 40,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  titleWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 30,
  },
});

export default function Create({ route, navigation }) {
  const [task, setTask] = useState(null);
  const [loading, setLoding] = useState(false);
  const userId = route.params.userId;
  const taskRef = firebase.firestore().collection("tasks");

  const onSave = () => {
    if (task && task.length > 0) {
      setLoding(true);

      const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

      const data = {
        description: task,
        authorId: userId,
        createdAt: timeStamp,
      };

      return taskRef
        .add(data)
        .then((_doc) => {
          setTask(null);
          setLoding(false);
        })
        .catch((err) => {
          console.log(err);
          setLoding(false);
        });
    }
    return alert("task is empty");
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Create Task</Text>
        </View>
        <TextInput value={task} onChangeText={(text) => setTask(text)} placeholder="Set Task" style={styles.input} />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ width: "50%", alignSelf: "center" }}>
            <Button title="SAVE" backgroundColor="#FFE600" onPress={onSave} />
          </View>
        )}
      </View>
    </View>
  );
}
