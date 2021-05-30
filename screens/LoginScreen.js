import * as React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { TextInput, StyleSheet, TouchableWithoutFeedback } from "react-native";
import "firebase/auth";
import firebase from "../database/firebaseDB";

const firebaseConfig = {
  apiKey: "AIzaSyB1LOxzplvFUMDPP2Ka8KrOToAlQ5DyLWY",
};

const db = firebase.firestore();
const auth = firebase.auth();

export default function LoginScreen({ navigaton }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    Keyboard.dismiss();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Signed In!");
        navigation.navigate("Chat", { email });
      })
      .catch((error) => {
        console.log("Error!");
        setErrorText("error.message");
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>CHat App</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}> {errorText} </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
