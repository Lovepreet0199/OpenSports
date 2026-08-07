import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/shared/AppHeader";
// import EventCard from "@/components/EventCard";
import SessionCard from "@/components/shared/SesssionCard";
import AppButton from "@/components/shared/AppButton";

export default function PlayerHomeScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        <AppHeader title="Pickleball" />
        {/* <EventCard
        format="Doubles"
        courtCount={3}
        location="East Side Rec"
        time="6:30 PM"
      /> */}
        {/*We don't need it anymore*/}

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

        <View style={styles.checkInButton}>
          <AppButton
            title="Check In"
            onPress={() => console.log("Check In pressed")}
          />
        </View>

        {/* <AppButton
        title="View Event"
        variant="secondary"
        onPress={() => console.log("View Event pressed")}
      /> */}

        <Text style={styles.sectionTitleUpcoming}>
          {"UPCOMING EVENT"}
        </Text>

        <SessionCard
          date="August 3, Monday"
          time="6:30 PM"
          checkedInPlayers={0}
          totalPlayers={24}
          location="East Side Rec Center"
        />

        <Text style={styles.sectionTitleUpcoming}>
          {"UPCOMING TOURNAMENT"}
        </Text>

        <SessionCard
          date="August 31, Monday"
          time="6:30 PM"
          checkedInPlayers={0}
          totalPlayers={24}
          location="East Side Rec Center"
        />
      </SafeAreaView>
    </ScrollView >
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
    color: "#2c9b3a",
    letterSpacing: 1,
    paddingHorizontal: 3,
  },
  sectionTitleUpcoming: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#7A8694",
    letterSpacing: 1,
    paddingHorizontal: 3,
  },
  scrollView: {

  },
  checkInButton: {
    marginTop: 14,
  },
});