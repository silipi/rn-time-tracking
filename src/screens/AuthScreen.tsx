import React from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import Props from "../types/screens";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";

type AuthScreenProps = Props<"Auth">;

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View>
      <TextInput
        value={email}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Criar conta"
        onPress={() => createUserWithEmailAndPassword(auth, email, password)}
      />
    </View>
  );
};

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View>
      <TextInput
        value={email}
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Login"
        onPress={() => signInWithEmailAndPassword(auth, email, password)}
      />
    </View>
  );
};

const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const [loading, setLoading] = React.useState(true);
  const [screenToShow, setScreenToShow] = React.useState<"LOGIN" | "REGISTER">(
    "LOGIN"
  );

  const renderScreen = {
    LOGIN: <Login />,
    REGISTER: <Register />,
  };

  onAuthStateChanged(
    auth,
    (user) => {
      setLoading(false);
      if (user !== null) {
        console.log({ user });

        navigation.navigate("Home");
      }
    },
    (err) => {
      setLoading(false);
      console.log(err);
    }
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Cadastre, ou faça login:</Text>
      {renderScreen[screenToShow]}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthScreen;
