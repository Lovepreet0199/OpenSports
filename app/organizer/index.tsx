import EventCard from "@/components/shared/EventCard";
import AppButton from "@/components/shared/AppButton";
import AppHeader from "@/components/shared/AppHeader";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionRow from "../../components/organizer/ActionRow";

export default function OrganizerHomeScreen() {
    /*
        We use Expo Router here because each organizer action leads
        to a different part of the tournament setup flow.
    */
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/*
                The screen is scrollable so all setup options remain accessible
                on smaller devices without changing the overall layout.
            */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/*
                    AppHeader is shared across screens so the app keeps
                    the same header design throughout the organizer flow.
                */}
                <AppHeader title="Check-in & Set up" />

                {/*
                    EventCard is reusable because event information is also
                    needed in other parts of the app. We pass the event details
                    as props instead of rebuilding the card on this screen.
                */}
                <EventCard
                    eventName="Tuseday Pickleball"
                    format="Doubles"
                    courtCount={3}
                    location="East Side Rec"
                    time="6:30 PM"
                />

                {/*
                    Check-in actions are grouped together because these are
                    tasks the organizer completes before starting the session.
                */}
                <View style={styles.checkInSection}>
                    <Text style={styles.sectionTitle}>
                        Check-in
                    </Text>

                    {/*
                        ActionRow is reused for organizer actions so each option
                        has the same icon, text, spacing, and press behaviour.
                    */}
                    <ActionRow
                        iconName="list-outline"
                        title="Players list"
                        onPress={() =>
                            router.push("/organizer/playerlist")
                        }
                    />

                    <ActionRow
                        iconName="scan-outline"
                        title="Scan code"
                        onPress={() =>
                            router.push("/organizer/scanplayer")
                        }
                    />
                </View>

                {/*
                    Tournament setup is separated from check-in because
                    setting up teams is a different stage of preparation.
                */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Tournament setup
                    </Text>

                    <ActionRow
                        iconName="people-outline"
                        title="Set up teams"
                        onPress={() =>
                            router.push("/organizer/setupteams")
                        }
                    />
                </View>

                {/*
                    Updates give the organizer important session changes
                    before the tournament starts, such as cancellations.
                */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Updates
                    </Text>

                    <View style={styles.updatesBox}>
                        <Text style={styles.updateText}>
                            Player cancelled: Alex
                        </Text>

                        <Text style={styles.updateText}>
                            Player cancelled: Lina
                        </Text>
                    </View>
                </View>

                {/*
                    The organizer enters the active Session screen only after
                    finishing the check-in and tournament setup flow.
                */}
                <View style={styles.startButton}>
                    <AppButton
                        title="Let's Start"
                        variant="primary"
                        onPress={() =>
                            router.push("/organizer/session")
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /*
        gap controls spacing between the check-in actions in one place
        instead of adding margins to the reusable ActionRow component.
    */
    checkInSection: {
        gap: 12,
    },

    /*
        The same section style is reused for Tournament Setup and Updates
        so both sections follow consistent spacing.
    */
    section: {
        gap: 12,
        marginTop: 24,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },

    /*
        The updates are grouped inside one bordered container so they
        are visually separated from the organizer action buttons.
    */
    updatesBox: {
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },

    /*
        Each update uses the same spacing and divider so multiple
        updates can be added while keeping the list consistent.
    */
    updateText: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: "#6B7280",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    /*
        marginTop: "auto" pushes the Start button toward the bottom
        when there is extra screen space.

        Because scrollContent uses flexGrow: 1, the button can stay
        near the bottom on taller screens while the page remains scrollable
        on smaller screens.
    */
    startButton: {
        marginTop: "auto",
        paddingBottom: 12,
    },

    /*
        SafeAreaView keeps the organizer content away from device
        system areas such as the Dynamic Island.
    */
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    scrollView: {
        flex: 1,
    },

    /*
        flexGrow allows the content to fill the whole screen when there
        is not enough content to naturally fill it.

        This also allows marginTop: "auto" on the Start button to work
        while still keeping the screen scrollable when necessary.
    */
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingBottom: 12,
    },
});