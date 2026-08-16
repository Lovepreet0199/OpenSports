import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type DisputeStatusWidgetProps = {
    onReviewDispute?: () => void;
};

export default function DisputeStatusWidget({
    onReviewDispute,
}: DisputeStatusWidgetProps) {
    return (
        <View style={styles.widget}>

            {/*
                The top row identifies which court currently
                has an active dispute.
            */}
            <View style={styles.headerRow}>
                <Ionicons
                    name="alert-circle-outline"
                    size={12}
                    color="#FE9A00"
                />

                <Text style={styles.headerText}>
                    Dispute · Court 2
                </Text>
            </View>

            {/*
                The middle section compares the score currently
                recorded with the score proposed in the dispute.
            */}
            <View style={styles.scoreComparison}>

                <View style={styles.scoreBlock}>
                    <Text style={styles.scoreLabel}>
                        Recorded
                    </Text>

                    <Text style={styles.recordedScore}>
                        5 - 6
                    </Text>
                </View>

                <View style={styles.verticalDivider} />

                <View style={styles.scoreBlock}>
                    <Text style={styles.scoreLabel}>
                        Proposed
                    </Text>

                    <Text style={styles.proposedScore}>
                        7 - 6
                    </Text>
                </View>

            </View>

            {/*
                The bottom row communicates the current dispute
                state and provides a quick action.
            */}
            <View style={styles.bottomRow}>

                <View style={styles.reviewingBadge}>
                    <View style={styles.statusDot} />

                    <Text style={styles.reviewingText}>
                        Organizer Reviewing
                    </Text>
                </View>

                <Pressable
                    style={styles.reviewButton}
                    onPress={onReviewDispute}
                >
                    <Ionicons
                        name="flag-outline"
                        size={10}
                        color="#FFFFFF"
                    />

                    <Text style={styles.reviewButtonText}>
                        Review Dispute
                    </Text>
                </Pressable>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    widget: {
        width: 329,
        height: 135,
        paddingHorizontal: 15,
        paddingVertical: 13,
        justifyContent: "space-between",

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "rgba(226,236,241,0.2)",
        borderRadius: 22,

        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 15,
        shadowOffset: {
            width: 0,
            height: 10,
        },

        elevation: 4,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    headerText: {
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 0.3,
        textTransform: "uppercase",
        color: "#E17100",
    },

    scoreComparison: {
        alignSelf: "center",
        width: 206,
        height: 44,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    scoreBlock: {
        width: 60,
        alignItems: "center",
    },

    scoreLabel: {
        fontSize: 10,
        fontWeight: "600",
        letterSpacing: 0.25,
        textTransform: "uppercase",
        color: "#7A8694",
    },

    recordedScore: {
        marginTop: 2,
        fontSize: 18,
        fontWeight: "700",
        color: "#0D1520",
    },

    proposedScore: {
        marginTop: 2,
        fontSize: 18,
        fontWeight: "700",
        color: "#2E903B",
    },

    verticalDivider: {
        width: 1,
        height: 44,
        backgroundColor: "rgba(0,0,0,0.08)",
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    reviewingBadge: {
        height: 29,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,

        backgroundColor: "#FFFBEB",
        borderRadius: 10,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#FFB900",
    },

    reviewingText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#BB4D00",
    },

    reviewButton: {
        height: 29,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,

        backgroundColor: "#2E903B",
        borderRadius: 10,
    },

    reviewButtonText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});