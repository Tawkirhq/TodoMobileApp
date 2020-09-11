import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import Button from "../components/Button";
import { firebase } from "../firebase/config";
import { AntDesign, Feather } from "@expo/vector-icons";
import Card from "../components/Card";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 60,
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
  cardText:{
    color: "#fff",
    fontSize:16
  }
});

export default function Home({ navigation, extraData }) {
  const [tasks, setTasks] = useState(null);
  const userId = extraData.uid;
  const taskRef = firebase.firestore().collection("tasks");

  const onDelete = (id) => {
    return taskRef.doc(id).delete();
  };

  useEffect(() => {
    const subcriber = taskRef
      .orderBy("createdAt", "desc")
      .where("authorId", "==", userId)
      .onSnapshot((querySnapshot) => {
        const newTasks = [];

        querySnapshot.forEach((doc) => {
          const task = doc.data();
          task.id = doc.id;
          task.color = task.priority === "High" ? "red" : task.priority == "Low" ? "green" : "blue";
          newTasks.push(task);
        });

        setTasks(newTasks);
      });
    return subcriber;
  }, []);

  const renderTasks = ({ item, index }) => {
    return (
      <Card customStyle={{ padding: 20, marginBottom: 15, backgroundColor: item.color }}>
        <View style={styles.titleWrapper}>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={styles.cardText}>{`Task #${index + 1} - `}</Text>
            <Text style={styles.cardText}>{item.description}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Update", { item })}>
              <Feather name="edit" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
              <AntDesign name="delete" size={24} color="#fff" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  if (!tasks || (tasks && tasks.length === 0)) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>My TODOs</Text>
          </View>
          <View>
            <Image
              style={{ height: 300, width: "100%", marginTop: 80 }}
              resizeMode="contain"
              source={require("../../assets/blank_canvas.png")}
            />
            <Text style={{ textAlign: "center", padding: 20, fontSize: 18 }}>Sorry you do not have tasks</Text>
            <View style={{ width: "50%", alignSelf: "center" }}>
              <Button title="ADD" backgroundColor="#FFE600" onPress={() => navigation.navigate("Create", { userId })} />
            </View>
          </View>
          {/* <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button
              title="LOGOUT"
              backgroundColor="blue"
              onPress={() => {
                firebase.auth().signOut();
              }}
            />
          </View> */}
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>My TODOs</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Create", { userId })}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList data={tasks} renderItem={renderTasks} keyExtractor={(item, index) => index.toString()} />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            title="LOGOUT"
            backgroundColor="green"
            onPress={() => {
              firebase.auth().signOut();
            }}
          />
        </View>
      </View>
    </View>
  );
}
