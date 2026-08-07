import ActionButton from "@/components/organizer/ActionButton";
import TeamRow from "@/components/organizer/TeamRow";
import { StyleSheet, Text, View } from "react-native";

type CourtCardProps = {
    courtNumber: number;
    status: string;
    teamOne: string;
    teamTwo: string;
    teamOneScore: number;
    teamTwoScore: number;
    actionTitle: string;
    variant?: "normal" | "dispute" | "resolved";
    onPress?: () => void;
}

export default function CourtCard({
    courtNumber,
    status,
    teamOne,
    teamTwo,
    teamOneScore,
    teamTwoScore,
    actionTitle,
    variant = "normal",
    onPress,
}: CourtCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.courtTitle}>
                    Court {courtNumber}
                </Text>

                <Text style={styles.status}>
                    {status}
                </Text>
            </View>

            <View style={styles.teams}>
                <TeamRow
                    teamName={teamOne}
                    score={teamOneScore}
                />

                <TeamRow
                    teamName={teamTwo}
                    score={teamTwoScore}
                />
            </View>

            <View style={styles.actionArea}>
                <ActionButton
                    title={actionTitle}
                    variant={variant === "dispute" ? "dispute" : "normal"}
                    onPress={onPress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 224,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 16,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    courtTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },

    status: {
        fontSize: 14,
        fontWeight: "600",
        color: "#47526C",
    },
    teams: {
        gap: 12,
        marginTop: 18,
    },
    actionArea: {
        marginTop: "auto",
    },
});