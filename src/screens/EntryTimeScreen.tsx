import React from "react";
import Toast from "react-native-toast-message";
import { Button, Text, View } from "react-native";
import Props from "../types/screens";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { firestore } from "../config/firebase";
import { AppContext } from "../context/AppContext";
import { findTimeEntry, getDocumentId } from "../utils";
import ButtonEntryTime from "../components/ButtonEntryTime";

type HomeScreenProps = Props<"HomeTabs">;

type ITimeEntrys = "start1" | "end1" | "start2" | "end2" | null;

const TimeEntrysText = {
  start1: "Entrada 1",
  end1: "Saída 1",
  start2: "Entrada 2",
  end2: "Saída 2",
};

const EntryTimeScreen = ({}: HomeScreenProps) => {
  const { user } = React.useContext(AppContext);
  const [timestamp, setTimestamp] = React.useState(
    new Date().toLocaleTimeString()
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const newTimeEntry = () => {
    getDoc(doc(firestore, "times", getDocumentId(user?.uid))).then(
      (snapshot) => {
        if (!snapshot.exists()) {
          setDoc(doc(firestore, "times", getDocumentId(user?.uid)), {
            start1: new Date().toISOString(),
          }).then(() => console.log("inserido"));
        }

        const entry = findTimeEntry(snapshot.data());

        if (entry === "ALL_FILLED") {
          return Toast.show({
            type: "success",
            text1: "✋ Opa...",
            text2: `Você já inseriu todas as entradas e saídas de hoje, descanse, volte amanhã.`,
          });
        }

        const newObj = {
          ...snapshot.data(),
          [entry]: new Date().toISOString(),
        };

        setDoc(snapshot.ref, newObj).then(() =>
          Toast.show({
            type: "success",
            text1: "🙌 Sucesso",
            text2: `${TimeEntrysText[entry]} foi inserida com sucesso!`,
          })
        );
      }
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Horário local:</Text>
      <Text>{timestamp}</Text>
      <ButtonEntryTime onPress={newTimeEntry} />
      <Text>Todos os horários serão salvos em UTC±00:00</Text>
    </View>
  );
};

export default EntryTimeScreen;
