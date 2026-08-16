import AppHeader from "@/components/shared/AppHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DisputeHistoryScreen() {
    const router = useRouter();

    /*
        We receive the court and dispute information from Manage Court.

        This allows one Dispute History screen to support:
        - Court 1 with no disputes
        - Court 2 with one normal dispute
        - Court 3 with a second contested dispute
    */
    const {
        courtNumber,
        teamOne,
        teamTwo,

        recordedTeamOneScore,
        recordedTeamTwoScore,

        reportedTeamOneScore,
        reportedTeamTwoScore,

        finalTeamOneScore,
        finalTeamTwoScore,

        reportedBy,
        isContested,
        reviewedBy,
    } = useLocalSearchParams();

    /*
        Expo Router params arrive as strings.

        Converting "true" into a boolean makes it easier to decide
        whether the Court 3 contested-history section should appear.
    */
    const contested = isContested === "true";


    /*
        Court 1 has no dispute information.

        If reportedBy is missing, we know there is no dispute history
        to display, so we show an empty state instead of an incomplete card.
    */
    if (!reportedBy) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>

                    <AppHeader
                        title={`Court ${courtNumber}`}
                        onBack={() => router.back()}
                    />

                    <Text style={styles.sectionTitle}>
                        Dispute history
                    </Text>

                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                            No disputes for this court.
                        </Text>
                    </View>

                </View>
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <AppHeader
                    title={`Court ${courtNumber}`}
                    onBack={() => router.back()}
                />

                <Text style={styles.sectionTitle}>
                    Dispute history
                </Text>


                {/*
                    All dispute information for the selected court is grouped
                    inside one history card to match the Figma layout.
                */}
                <View style={styles.historyCard}>

                    {/* History date and current status */}
                    <View style={styles.historyHeader}>
                        <Text style={styles.timeText}>
                            Today, 5:42 PM
                        </Text>

                        <View style={styles.resolvedBadge}>
                            <Text style={styles.resolvedBadgeText}>
                                Resolved
                            </Text>
                        </View>
                    </View>


                    {/*
                        FIRST DISPUTE

                        This is the original dispute that was reported
                        by the player.
                    */}
                    <View style={styles.disputeDetails}>

                        <Text style={styles.reportedBy}>
                            Reported by {String(reportedBy)}
                        </Text>

                        <View style={styles.detailLines}>

                            <Text style={styles.detailText}>
                                Recorded score:{" "}
                                {Number(recordedTeamOneScore)} -{" "}
                                {Number(recordedTeamTwoScore)}
                            </Text>

                            <Text style={styles.detailText}>
                                {String(reportedBy)} claimed:{" "}
                                {Number(reportedTeamOneScore)} -{" "}
                                {Number(reportedTeamTwoScore)}
                            </Text>

                            <Text style={styles.reasonText}>
                                Reason: Point to wrong team
                            </Text>


                            {/*
                                Court 2 has no opponent response.

                                Court 3 has a second contested dispute instead,
                                so we only show this line for the normal
                                non-contested flow.
                            */}
                            {!contested && (
                                <Text style={styles.detailText}>
                                    {String(teamTwo)} did not respond
                                </Text>
                            )}

                        </View>
                    </View>


                    {/*
                        FIRST FINAL SCORE

                        Every dispute event has its own resolved result.
                        This is the result for the first dispute.
                    */}
                    <View style={styles.resolutionSection}>
                        <Text style={styles.finalScore}>
                            Final score{" "}
                            {Number(finalTeamOneScore)} -{" "}
                            {Number(finalTeamTwoScore)}
                        </Text>

                        <Text style={styles.resolvedBy}>
                            Resolved by organizer
                        </Text>
                    </View>


                    {/*
                        SECOND / CONTESTED DISPUTE

                        Court 3 contains another dispute where both sides
                        gave different versions of the score.

                        Figma keeps this inside the same white history card
                        instead of using a separate coloured card.
                    */}
                    {contested && (
                        <>
                            <View style={styles.contestedSection}>

                                <Text style={styles.contestedTitle}>
                                    Contested by both sides
                                </Text>

                                <View style={styles.contestedDetails}>

                                    <Text style={styles.detailText}>
                                        Recorded score:{" "}
                                        {Number(recordedTeamOneScore)} -{" "}
                                        {Number(recordedTeamTwoScore)}
                                    </Text>

                                    <Text style={styles.detailText}>
                                        {String(reportedBy)} claimed:{" "}
                                        {Number(reportedTeamOneScore)} -{" "}
                                        {Number(reportedTeamTwoScore)}
                                    </Text>

                                    <Text style={styles.reasonText}>
                                        Reason: Point to wrong team
                                    </Text>

                                    <Text style={styles.detailText}>
                                        {String(reviewedBy)} claimed:{" "}
                                        {Number(recordedTeamOneScore)} -{" "}
                                        {Number(recordedTeamTwoScore)}
                                    </Text>

                                    <Text style={styles.contestedReason}>
                                        Reason: Score is correct as recorded
                                    </Text>

                                </View>
                            </View>


                            {/*
                                SECOND FINAL SCORE

                                Court 3 needs another resolution section because
                                the contested dispute is a separate dispute event.
                            */}
                            <View style={styles.secondResolutionSection}>
                                <Text style={styles.finalScore}>
                                    Final score{" "}
                                    {Number(finalTeamOneScore)} -{" "}
                                    {Number(finalTeamTwoScore)}
                                </Text>

                                <Text style={styles.resolvedBy}>
                                    Resolved by organizer
                                </Text>
                            </View>
                        </>
                    )}


                    {/*
                        The bottom badge gives the organizer a quick summary
                        of how many disputes the reporting player has made.

                        We currently keep the prototype wording simple.
                    */}
                    <View style={styles.disputeCountBadge}>
                        <Text style={styles.disputeCountText}>
                            {String(reportedBy)}:{" "}
                            {contested ? "2 disputes" : "1st dispute"} this session
                        </Text>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    container: {
        flex: 1,
        paddingHorizontal: 23,
    },

    sectionTitle: {
        marginTop: 18,
        marginBottom: 22,
        paddingLeft: 18,
        fontSize: 17,
        fontWeight: "600",
        color: "#9099B0",
    },


    /*
        Shown when the selected court has never had a dispute.
    */
    emptyState: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1ECF1",
        borderRadius: 13,
        alignItems: "center",
    },

    emptyStateText: {
        fontSize: 15,
        fontWeight: "400",
        color: "#9099B0",
    },


    /*
        Court 2 and Court 3 history content stays inside one white card.
    */
    historyCard: {
        width: "100%",
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1ECF1",
        borderRadius: 13,
    },


    historyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    timeText: {
        fontSize: 15,
        fontWeight: "400",
        color: "#9099B0",
    },

    resolvedBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: "#E8F5EA",
        borderRadius: 99,
    },

    resolvedBadgeText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#2E903B",
    },


    /*
        The original reported dispute is separated from its final result
        with a divider underneath.
    */
    disputeDetails: {
        marginTop: 12,
        paddingBottom: 11,
        borderBottomWidth: 1,
        borderBottomColor: "#E6EBF2",
    },

    reportedBy: {
        fontSize: 17,
        fontWeight: "600",
        color: "#1E293B",
    },

    detailLines: {
        marginTop: 12,
        gap: 8,
    },

    detailText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#47526C",
    },

    reasonText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#F78D2C",
    },


    /*
        This is the final result for the first dispute.
        The divider below it separates it from Court 3's second dispute.
    */
    resolutionSection: {
        marginTop: 12,
        paddingBottom: 11,
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E6EBF2",
    },

    finalScore: {
        fontSize: 17,
        fontWeight: "600",
        color: "#2E903B",
    },

    resolvedBy: {
        fontSize: 14,
        fontWeight: "400",
        color: "#47526C",
    },


    /*
        Court 3's second dispute is shown as another normal section
        inside the same card, matching the Figma.
    */
    contestedSection: {
        marginTop: 12,
        paddingBottom: 11,
        borderBottomWidth: 0.5,
        borderBottomColor: "#E6EBF2",
    },

    contestedTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#1E293B",
    },

    contestedDetails: {
        marginTop: 12,
        gap: 8,
    },

    /*
        Purple is used only for the opposing side's reason,
        matching the contested-state styling from Figma.
    */
    contestedReason: {
        fontSize: 12,
        fontWeight: "500",
        color: "#7248E3",
    },


    /*
        Court 3 gets a second final-score block because the contested
        event is another separately resolved dispute.
    */
    secondResolutionSection: {
        marginTop: 12,
        paddingBottom: 11,
        gap: 8,
    },


    disputeCountBadge: {
        alignSelf: "flex-start",
        marginTop: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#FCF2CA",
        borderRadius: 14,
    },

    disputeCountText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#CC6100",
    },
});