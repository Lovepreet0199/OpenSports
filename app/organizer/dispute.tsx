import DecisionButton from "@/components/organizer/DecisionButton";
import AppHeader from "@/components/shared/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DisputeScreen() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <AppHeader
                    onBack={() => router.back()}
                    title="Court 2 - Dispute"
                />

                {/* Recorded Score */}
                <View style={styles.recordedCard}>
                    <Text style={styles.recordedTitle}>
                        Recorded score
                    </Text>

                    <View style={styles.scoreRows}>
                        <View style={styles.scoreRow}>
                            <Text style={styles.teamName}>
                                Simon & John G.
                            </Text>

                            <Text style={styles.smallScore}>
                                5
                            </Text>
                        </View>

                        <View style={styles.scoreRow}>
                            <Text style={styles.teamName}>
                                Leo & Maria
                            </Text>

                            <Text style={styles.smallScore}>
                                6
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Reported Score */}
                <View style={styles.reportedCard}>
                    <Text style={styles.reportedTitle}>
                        Reported by Simon
                    </Text>

                    <View style={styles.reportedScoreRow}>
                        <Text style={styles.reportedLabel}>
                            Says it should be
                        </Text>

                        <Text style={styles.reportedScore}>
                            5 - 5
                        </Text>
                    </View>

                    <Text style={styles.reasonText}>
                        Reason: Point to wrong team
                    </Text>
                </View>

                {/* Opponent Response */}
                <View style={styles.responseCard}>
                    <Text style={styles.responseText}>
                        Leo & Maria have not responded
                    </Text>
                </View>

                {/* Dispute Count Badge */}
                <View style={styles.disputeBadge}>
                    <Ionicons
                        name="time-outline"
                        size={14}
                        color="#B45309"
                    />

                    <Text style={styles.disputeBadgeText}>
                        Simon: 1st dispute this session
                    </Text>
                </View>

                {/* Organizer Note */}
                <TextInput
                    style={styles.noteInput}
                    placeholder="Add a note about this decision"
                    placeholderTextColor="#99A1AF"
                />
                <View style={styles.decisions}>
                    <DecisionButton
                        title="Accept"
                        description="Score becomes"
                        teamOneScore={5}
                        teamTwoScore={5}
                        variant="accept"
                        onPress={() => { }}
                    />

                    <DecisionButton
                        title="Reject"
                        description="Score stays"
                        teamOneScore={5}
                        teamTwoScore={6}
                        variant="reject"
                        onPress={() => { }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    scrollView: {
        flex: 1,
    },

    content: {
        flexGrow: 1,
        paddingHorizontal: 18,
        paddingBottom: 24,
    },

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
    decisions: {
        gap: 16,
        marginTop: 16,
    }
});