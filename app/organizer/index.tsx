import EventCard from "@/components/shared/EventCard";
import AppButton from "@/components/shared/AppButton";
import AppHeader from "@/components/shared/AppHeader";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionRow from "../../components/organizer/ActionRow";

export default function OrganizerHomeScreen() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                <AppHeader title="Check-in & Set up" />

                <EventCard
                    eventName="Tuseday Pickleball"
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
                        onPress={() => router.push('/organizer/playerlist')}
                    />

                    <ActionRow
                        iconName="scan-outline"
                        title="Scan code"
                        onPress={() => router.push('/organizer/scanplayer')}
                    />

                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tournament setup</Text>
                    <ActionRow
                        iconName="people-outline"
                        title="Set up teams"
                        onPress={() => router.push('/organizer/setupteams')}
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
                        onPress={() => router.push('/organizer/session')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({

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
        marginBottom: 20,
    },

    updatesBox: {
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },

    updateText: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: "#6B7280",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    startButton: {
        marginTop: "auto",
        paddingBottom: 12,
    },

    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingBottom: 12,
    },

});