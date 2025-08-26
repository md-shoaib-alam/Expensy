import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale } from "@/utils/styling";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

const HomeCard = () => {
  return (
    <View>
      <Typo>HomeCard</Typo>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  bgImages: {
    height: scale(210),
    width: "100%",
  },
  container: {
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    height: "87%",
    width: "100%",
    justifyContent: "space-between",
  },
  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacingY._5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsIcon: {
    backgroundColor: colors.neutral350,
    padding: spacingY._5,
    borderRadius: 50,
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._7,
  },
});
