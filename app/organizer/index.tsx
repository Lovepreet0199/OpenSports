import AppHeader from "@/components/AppHeader";
import EventCard from "@/components/EventCard";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionRow from "../../components/ActionRow";
import AppButton from "@/components/AppButton";

export default function OrganizerHomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <AppHeader title="Check-in & Set up" />

            <EventCard
                eventName="Tuseday's Pickleball"
                format="Doubles"
                courtCount={3}
                location="East Side Rec"
                time="6:30 PM"
            />

            <View style={styles.checkInSection}>

                <Text style={styles.sectionTitle}>Check-in</Text>
                <ActionRow
                    iconName="list-outline"
                    title="Players list"
                />

                <ActionRow
                    iconName="scan-outline"
                    title="Scan code"
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tournament setup</Text>
                <ActionRow
                    iconName="people-outline"
                    title="Set up teams"
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Updates</Text>

                <View style={styles.updatesBox}>
                    <Text style={styles.updateText}>Player cancelled: Alex</Text>
                    <Text style={styles.updateText}>Player cancelled: Lina</Text>
                </View>
            </View>
            <View style={styles.startButton}>
                <AppButton
                    title="Let's Start"
                    variant="primary"
                    onPress={() => { }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#fff",

    },
    checkInSection: {
        gap: 12,
    },
    section: {
        gap: 12,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
    eventCard: {
        marginBottom: 24,
    },
    updatesBox: {
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },

    updateText: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: "#6B7280",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    startButton: {
        marginTop: "auto",
        paddingBottom: 12,
    },
});