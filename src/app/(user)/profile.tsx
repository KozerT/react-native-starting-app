import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { supabase } from "@/src/lib/supabase";

const ProfileScreen = () => {
  return (
    <View>
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  signOutBtn: {
    flex: 1,
  },
});
