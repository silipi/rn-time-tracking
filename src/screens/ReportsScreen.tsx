import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import TimeEntryReport from "../components/TimeEntryReport";
import { firestore } from "../config/firebase";
import { AppContext } from "../context/AppContext";

const html = (entriesFromFunc: any[]) => `
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <ul class="container">${entriesFromFunc.map(
      (entry) =>
        `<li> start1: ${entry?.start1}; end1: ${entry?.end1}; start2: ${entry?.start2}; end2: ${entry?.end2}</li>`
    )}</ul>
  </body>
</html>

`;

export const ENTRIES = [] as any[];

const ReportsScreen = () => {
  const { user } = React.useContext(AppContext);
  const [entries, setEntries] = React.useState<any[]>([]);

  const createAndSavePDF = async () => {
    ENTRIES.push(...entries);

    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html: html(entries),
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  React.useEffect(() => {
    const text = user?.uid || "";
    const end = text.replace(/.$/, (c) =>
      String.fromCharCode(c.charCodeAt(0) + 1)
    );

    const q = query(
      collection(firestore, "times"),
      where("__name__", ">=", text),
      where("__name__", "<", end)
    );
    getDocs(q).then((snapshot) => {
      if (snapshot.empty) return;

      const newData = snapshot.docs.map((d) => ({
        ...d.data(),
        id: d.id,
      })) as any;
      setEntries(newData);
    });
  }, []);

  return (
    <View>
      <Text style={{ textAlign: "center" }}>
        Todos os horários e datas exibidos aqui são em UTC±00:00
      </Text>
      <Button title="Gerar relatório" onPress={createAndSavePDF} />
      <FlatList renderItem={TimeEntryReport} data={entries} />
    </View>
  );
};

export default ReportsScreen;
