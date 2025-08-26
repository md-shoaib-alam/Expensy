import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import ScreenWrapper from "@/components/ScreenWrapper";
import { verticalScale } from "@/utils/styling";

const Index = () => {
  return (
    <ScreenWrapper>
      <Typo> Home </Typo>
    </ScreenWrapper>
  );
};

export default Index;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:spacingX._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  SearchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
  scrollviewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
