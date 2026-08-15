import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DisputeResolvedScreen() {
    const router = useRouter();

    /*
        The dispute screen sends the result of the organizer's decision
        to this confirmation screen.

        We keep these values so they can be passed back to the Session
        screen when the organizer finishes the dispute flow.
    */
    const {
        courtNumber,
        decision,
        teamOneScore,
        teamTwoScore,
    } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/*
                    The green checkmark gives immediate visual confirmation
                    that the organizer has successfully resolved the dispute.
                */}
                <View style={styles.iconCircle}>
                    <Ionicons
                        name="checkmark"
                        size={36}
                        color="#2E903B"
                    />
                </View>

                {/*
                    This confirmation is intentionally simple because the
                    organizer has already completed the decision and only
                    needs confirmation before returning to the session.
                */}
                <View style={styles.messageSection}>
                    <Text style={styles.title}>
                        Dispute Resolved
                    </Text>

                    <Text style={styles.message}>
                        Both teams notified. Logged in history.
                    </Text>
                </View>

                {/*
                    Instead of only navigating back, we send the resolved
                    court information to the Session screen.

                    This allows Session to know which CourtCard was resolved
                    and what score should now be displayed.
                */}
                <Pressable
                    style={styles.backButton}
                    onPress={() =>
                        router.replace({
                            pathname: "/organizer/session",
                            params: {
                                /*
                                    The court number identifies which court
                                    should change from Resolve Dispute
                                    back to Manage Court.
                                */
                                resolvedCourt: courtNumber,

                                /*
                                    We keep the decision available in case
                                    the prototype later needs to distinguish
                                    between accepted and rejected disputes,
                                    such as when displaying dispute history.
                                */
                                decision: decision,

                                /*
                                    The dispute screen already decided which
                                    score should be final:

                                    Accept -> reported score
                                    Reject -> original recorded score

                                    We simply pass that final score back
                                    to the Session screen.
                                */
                                resolvedTeamOneScore: teamOneScore,
                                resolvedTeamTwoScore: teamTwoScore,
                            },
                        })
                    }
                >
                    <Text style={styles.backButtonText}>
                        Back to session
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /*
        SafeAreaView prevents the confirmation content from overlapping
        with iPhone system areas such as the Dynamic Island.
    */
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    /*
        The confirmation content is centered because this screen has
        one main purpose: confirm that the dispute was resolved.
    */
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    /*
        The light green circle and checkmark follow the confirmation
        styling from the Figma design and visually communicate success.
    */
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#D1EAD4",
        justifyContent: "center",
        alignItems: "center",
    },

    /*
        A fixed content width keeps the confirmation message compact
        and centered instead of stretching across the whole phone.
    */
    messageSection: {
        width: 257,
        marginTop: 24,
        gap: 12,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#47526C",
        textAlign: "center",
    },

    message: {
        fontSize: 14,
        fontWeight: "400",
        color: "#9099B0",
        textAlign: "center",
    },

    /*
        The button uses the same width as the message section so the
        confirmation content stays visually aligned.
    */
    backButton: {
        width: 257,
        height: 55,
        marginTop: 24,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1ECF1",
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
    },

    backButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1E293B",
        textAlign: "center",
    },
});