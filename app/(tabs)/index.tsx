import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/AppHeader";
import EventCard from "@/components/EventCard";
import SessionCard from "@/components/SesssionCard";
import AppButton from "@/components/PrimaryButton";

export default function PlayerHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Tuesday Pickleball" />
      <EventCard
        format="Doubles"
        courtCount={3}
        location="East Side Rec"
        time="6:30 PM"
      />

      <Text style={styles.sectionTitle}>
        {"TODAY'S SESSION"}
      </Text>

      <SessionCard
        date="Today, Tuseday"
        time="6:30 PM"
        checkedInPlayers={18}
        totalPlayers={24}
        location="East Side Rec Center"
      />
      <AppButton
        title="Check In"
        onPress={() => console.log("Check In pressed")}
      />

      <AppButton
        title="View Event"
        variant="secondary"
        onPress={() => console.log("View Event pressed")}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F3",
    paddingHorizontal: 25,
  },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#7A8599",
    letterSpacing: 1,
    paddingHorizontal: 3,
  },
});