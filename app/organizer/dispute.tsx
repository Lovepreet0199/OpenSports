import DecisionButton from "@/components/organizer/DecisionButton";
import AppHeader from "@/components/shared/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DisputeScreen() {
    const router = useRouter();

    /*
        We receive the selected court information through route parameters.

        This lets us reuse ONE dispute screen for Court 2, Court 3,
        or any future court instead of creating a separate screen
        for every court.
    */
    const {
        courtNumber,
        teamOne,
        teamTwo,
        teamOneScore,
        teamTwoScore,
        reportedTeamOneScore,
        reportedTeamTwoScore,
        reportedBy,
    } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/*
                    The court number is dynamic because the organizer
                    may open this screen from any court that has a dispute.
                */}
                <AppHeader
                    title={`Court ${courtNumber} - Dispute`}
                    onBack={() => router.back()}
                />

                {/*
                    The recorded score shows the score that is currently
                    stored for the selected court.

                    We keep it separate from the reported score so the
                    organizer can compare the two before making a decision.
                */}
                <View style={styles.recordedCard}>
                    <Text style={styles.recordedTitle}>
                        Recorded score
                    </Text>

                    <View style={styles.scoreRows}>
                        <View style={styles.scoreRow}>
                            <Text style={styles.teamName}>
                                {String(teamOne)}
                            </Text>

                            <Text style={styles.smallScore}>
                                {Number(teamOneScore)}
                            </Text>
                        </View>

                        <View style={styles.scoreRow}>
                            <Text style={styles.teamName}>
                                {String(teamTwo)}
                            </Text>

                            <Text style={styles.smallScore}>
                                {Number(teamTwoScore)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/*
                    The reported score is stored separately from the
                    recorded score.

                    This is important because:
                    - Accept should use the reported score.
                    - Reject should keep the original recorded score.
                */}
                <View style={styles.reportedCard}>
                    <Text style={styles.reportedTitle}>
                        Reported by {String(reportedBy)}
                    </Text>

                    <View style={styles.reportedScoreRow}>
                        <Text style={styles.reportedLabel}>
                            Says it should be
                        </Text>

                        <Text style={styles.reportedScore}>
                            {Number(reportedTeamOneScore)} -{" "}
                            {Number(reportedTeamTwoScore)}
                        </Text>
                    </View>

                    <Text style={styles.reasonText}>
                        Reason: Point to wrong team
                    </Text>
                </View>

                {/*
                    teamTwo is dynamic so this message automatically
                    changes depending on which court is being reviewed.
                */}
                <View style={styles.responseCard}>
                    <Text style={styles.responseText}>
                        {String(teamTwo)} have not responded
                    </Text>
                </View>

                {/*
                    reportedBy is also passed from the selected court
                    so the dispute history is not hardcoded to one player.
                */}
                <View style={styles.disputeBadge}>
                    <Ionicons
                        name="time-outline"
                        size={14}
                        color="#B45309"
                    />

                    <Text style={styles.disputeBadgeText}>
                        {String(reportedBy)}: 1st dispute this session
                    </Text>
                </View>

                {/*
                    The organizer can optionally leave a note before
                    accepting or rejecting the dispute.
                */}
                <TextInput
                    style={styles.noteInput}
                    placeholder="Add a note about this decision"
                    placeholderTextColor="#99A1AF"
                />

                <View style={styles.decisions}>
                    {/*
                        Accept uses the REPORTED score because accepting
                        the dispute means the player's corrected score
                        should become the new court score.

                        We also pass the court number forward so the
                        Session screen can later know which court was resolved.
                    */}
                    <DecisionButton
                        title="Accept"
                        description="Score becomes"
                        teamOneScore={Number(reportedTeamOneScore)}
                        teamTwoScore={Number(reportedTeamTwoScore)}
                        variant="accept"
                        onPress={() =>
                            router.push({
                                pathname: "/organizer/dispute-resolved",
                                params: {
                                    courtNumber: courtNumber,
                                    decision: "accept",

                                    // Accept sends the reported score.
                                    teamOneScore: reportedTeamOneScore,
                                    teamTwoScore: reportedTeamTwoScore,
                                },
                            })
                        }
                    />

                    {/*
                        Reject keeps the ORIGINAL recorded score because
                        the organizer is deciding that the reported score
                        should not replace the current result.

                        The same resolved screen is used, but we send the
                        original score instead of the reported score.
                    */}
                    <DecisionButton
                        title="Reject"
                        description="Score stays"
                        teamOneScore={Number(teamOneScore)}
                        teamTwoScore={Number(teamTwoScore)}
                        variant="reject"
                        onPress={() =>
                            router.push({
                                pathname: "/organizer/dispute-resolved",
                                params: {
                                    courtNumber: courtNumber,
                                    decision: "reject",

                                    // Reject keeps the original recorded score.
                                    teamOneScore: teamOneScore,
                                    teamTwoScore: teamTwoScore,
                                },
                            })
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /*
        SafeAreaView keeps the screen content away from areas such as
        the iPhone Dynamic Island and system UI.
    */
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    /*
        The dispute screen can become taller than the device because
        it contains several cards and decision buttons, so ScrollView
        allows the organizer to reach all content.
    */
    scrollView: {
        flex: 1,
    },

    /*
        flexGrow allows the ScrollView content to fill the screen
        while still being able to grow when more vertical space is needed.
    */
    content: {
        flexGrow: 1,
        paddingHorizontal: 18,
        paddingBottom: 24,
    },

    /*
        This card represents the score currently recorded by the system.
        Its neutral grey background separates it from the disputed score.
    */
    recordedCard: {
        width: "100%",
        height: 118,
        marginTop: 21,
        padding: 16,
        backgroundColor: "#F3F4F6",
        borderRadius: 16,
    },

    recordedTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#6A7282",
    },

    scoreRows: {
        paddingTop: 8,
    },

    /*
        Each score row places the team name on the left
        and its score on the right.
    */
    scoreRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 26,
    },

    teamName: {
        fontSize: 17,
        fontWeight: "500",
        color: "#1E2939",
    },

    smallScore: {
        fontSize: 21,
        fontWeight: "600",
        color: "#101828",
    },

    /*
        The reported score uses the yellow warning style from Figma
        because it represents information that needs organizer review.
    */
    reportedCard: {
        width: "100%",
        height: 122,
        marginTop: 18,
        padding: 16,
        backgroundColor: "#FFFBEB",
        borderWidth: 1,
        borderColor: "#FEE685",
        borderRadius: 13,
    },

    reportedTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#BB4D00",
    },

    reportedScoreRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 8,
    },

    reportedLabel: {
        fontSize: 17,
        fontWeight: "500",
        color: "#364153",
    },

    /*
        The reported score is larger so the organizer can quickly
        compare it with the recorded score above.
    */
    reportedScore: {
        fontSize: 24,
        fontWeight: "700",
        color: "#101828",
    },

    reasonText: {
        paddingTop: 4,
        fontSize: 14,
        fontWeight: "400",
        color: "#6A7282",
    },

    /*
        A dashed border visually communicates that the organizer
        is still waiting for information from the opposing team.
    */
    responseCard: {
        width: "100%",
        height: 62,
        marginTop: 18,
        padding: 16,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#D1D5DC",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    responseText: {
        fontSize: 17,
        fontWeight: "400",
        color: "#99A1AF",
        textAlign: "center",
    },

    /*
        The badge gives the organizer extra context about how many
        disputes the reporting player has made during the session.
    */
    disputeBadge: {
        alignSelf: "flex-start",
        minHeight: 37,
        marginTop: 18,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#FEF3C7",
        borderRadius: 14,
    },

    disputeBadgeText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#92400E",
    },

    /*
        The note field is kept separate from the decision buttons
        because the organizer may want to record context before deciding.
    */
    noteInput: {
        width: "100%",
        height: 50,
        marginTop: 16,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        fontSize: 16,
        color: "#1E2939",
    },

    /*
        gap keeps a consistent space between Accept and Reject
        without giving each reusable DecisionButton its own margin.
    */
    decisions: {
        gap: 16,
        marginTop: 16,
    },
});