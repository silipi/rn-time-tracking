import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { getFormattedDateFromDocId, getTimeFromISO } from "../utils";

const TimeEntryReport = ({ item }: { item: any }) => {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>
        Data: {getFormattedDateFromDocId(item?.id)}
      </Text>

      <View style={styles.timeEntry}>
        <Text>Entrada 1: {getTimeFromISO(item?.start1)}</Text>
        <Text>Saída 1: {getTimeFromISO(item?.end1)}</Text>
      </View>

      <View style={styles.timeEntry}>
        <Text>Entrada 2: {getTimeFromISO(item?.start2)}</Text>
        <Text>Saída 2: {getTimeFromISO(item?.end2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#515151",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 8,
  },
  timeEntry: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TimeEntryReport;
