import { StyleSheet, Text, View } from "react-native";

type TeamRowProps = {
    teamName: string;
    score: number;
};

export default function TeamRow({
    teamName,
    score,
}: TeamRowProps) {
    return (
        <View style={styles.teamRow}>
            <Text style={styles.teamName}>
                {teamName}
            </Text>

            <Text style={styles.score}>
                {score}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    teamRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    teamName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1E293B",
    },

    score: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },
});