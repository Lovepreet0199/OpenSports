import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type LiveMatchWidgetProps = {
    onReportIssue?: () => void;
};

export default function LiveMatchWidget({
    onReportIssue,
}: LiveMatchWidgetProps) {
    return (
        <View style={styles.widget}>

            {/*
                The top status identifies the current live court.
            */}
            <View style={styles.liveRow}>
                <View style={styles.liveDot} />

                <Text style={styles.liveText}>
                    Live · Court 2
                </Text>
            </View>

            {/*
                The live score is displayed using the same teams
                used in the Court 2 dispute prototype.
            */}
            <View style={styles.scoreSection}>

                <View style={styles.teamRow}>
                    <Text style={styles.teamOne}>
                        Simon & John G.
                    </Text>

                    <Text style={styles.scoreOne}>
                        5
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.teamRow}>
                    <Text style={styles.teamTwo}>
                        Leo & Maria
                    </Text>

                    <Text style={styles.scoreTwo}>
                        6
                    </Text>
                </View>

            </View>

            {/*
                The bottom row gives match context and provides
                quick access to the Report Issue flow.
            */}
            <View style={styles.bottomRow}>

                <Text style={styles.playingTo}>
                    Playing to 11
                </Text>

                <Pressable
                    style={styles.reportButton}
                    onPress={onReportIssue}
                >
                    <Ionicons
                        name="flag-outline"
                        size={11}
                        color="#FFFFFF"
                    />

                    <Text style={styles.reportText}>
                        Report Issue
                    </Text>
                </Pressable>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    widget: {
        width: 329,
        height: 155,
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: "space-between",
        backgroundColor: "#0F172A",
        borderRadius: 22,
    },

    liveRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#2E903B",
    },

    liveText: {
        fontSize: 11,
        fontWeight: "600",
        letterSpacing: 0.3,
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.6)",
    },

    scoreSection: {
        gap: 4,
    },

    teamRow: {
        height: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    teamOne: {
        fontSize: 13,
        fontWeight: "500",
        color: "#FFFFFF",
    },

    teamTwo: {
        fontSize: 13,
        fontWeight: "500",
        color: "rgba(255,255,255,0.6)",
    },

    scoreOne: {
        fontSize: 28,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    scoreTwo: {
        fontSize: 28,
        fontWeight: "700",
        color: "rgba(255,255,255,0.7)",
    },

    divider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.15)",
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    playingTo: {
        fontSize: 11,
        fontWeight: "400",
        color: "rgba(255,255,255,0.4)",
    },

    reportButton: {
        height: 25,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#2E903B",
        borderRadius: 10,
    },

    reportText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});