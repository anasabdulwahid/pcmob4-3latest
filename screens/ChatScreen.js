import { Text, View,  StyleSheet, Button, TouchableOpacity  } from "react-native";
import React, { useEffect, useState} from "react";
import firebase from "../database/firebaseDB";
import { MaterialCommunityIcons} from "@expo/vector-icons";
import {GiftedChat} from 'react-native-gifted-chat';
import "firebase/auth";

const db = firebase.firestore().collection("messages");
const auth = firebase.auth();
const anonymousUser = { name: "a@a.com", id: "xxx"};

export default function ChatScreen({navigaton}){
    const [messages, setMessages] =useState([]);
    const [currentUser, setCurrentUser] = useState(anonymousUser);
    //handling log in and log out, and setting up the database

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("Chat");
          setCurrentUser({ id: user.uid, name: user.email });
        } else {
          navigation.navigate("Login");
          setCurrentUser(anonymousUser);
        }
        
useEffect(() => {
    const unsubscribe = db
    .orderBy("createdAt", 'desc')
    .onSnapshot((collectionSnapshot) => {
        const serverMessages = collectionSnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("data");
            //Above shows us that createdAt is now an object, with " seconds"
            //and "nanoseconds". if we just take the former X 1000, we can recreate a 35 date...

            const jsDate = new Date(data.createdAt.seconds * 1000); // convert to ms
            const newDoc = {
                ...data,
                createdAt: jsDate, // this overwrites the existing createdAt
            };
            return newDoc;
        });
        setMessages(serverMessages);

    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            navigaton.navigate("chat", { id: user.id, email: user.email });
            } else {
            navigaton.navigate("Login");
    }
});
//put the logout button in the header
navigaton.setOptions({
    headerRight: () => {
        <TouchableOpacity onPress={logout}>
            <MaterialCommunityIcons
            name="Logout"
            size={24}
            color="grey"
            style={{marginRight: 20}}
            />
        </TouchableOpacity>
    },
});

return unsubscribe;
}, []);


function logout() {
    firebase.auth().signout();
}

function onSend(messages) {
    console.log(messages);
    db.add(messages[0]);
    }
    

    if (firebase.auth().currentUser){
return (
<GiftedChat
    messages={messages}
    onSend={(messages) => onSend(messages)}
    user={{
    _id:1,
    name: "second",
    avatar: "https://placeimg.com/140/140/any"
}}
/>
);
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ffc",
      alignItems: "center",
      justifyContent: "center",
    },
  });






