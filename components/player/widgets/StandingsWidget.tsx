import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type StandingsWidgetProps = {
    onPress?: () => void;
};

export default function StandingsWidget({
    onPress,
}: StandingsWidgetProps) {

    /*
        The standings data is kept in an array so the rows can
        be generated instead of writing each row separately.
    */
    const standings = [
        {
            rank: 1,
            team: "John K. & Katy",
            points: 12,
            isUser: false,
        },
        {
            rank: 2,
            team: "Roger & Alex",
            points: 10,
            isUser: false,
        },
        {
            rank: 3,
            team: "Simon (You) & John G.",
            points: 9,
            isUser: true,
        },
        {
            rank: 4,
            team: "Leo & Maria",
            points: 8,
            isUser: false,
        },
        {
            rank: 5,
            team: "Sarah & Melissa",
            points: 6,
            isUser: false,
        },
    ];

    return (
        <Pressable
            style={styles.widget}
            onPress={onPress}
        >

            {/*
                The header identifies the widget and shows the
                player's current tournament position.
            */}
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Ionicons
                        name="trophy-outline"
                        size={14}
                        color="#2E903B"
                    />

                    <Text style={styles.title}>
                        Standings
                    </Text>
                </View>

                <View style={styles.rankSection}>
                    <Text style={styles.rankLabel}>
                        Your rank
                    </Text>

                    <Text style={styles.rankValue}>
                        3rd
                    </Text>
                </View>
            </View>

            {/*
                Each team is generated from the standings array.

                The player's own row gets a green background so it
                can be identified quickly.
            */}
            <View style={styles.standingsList}>
                {standings.map((team) => (
                    <View
                        key={team.rank}
                        style={[
                            styles.standingRow,
                            team.isUser && styles.userRow,
                        ]}
                    >
                        <Text
                            style={[
                                styles.position,
                                team.isUser && styles.userText,
                            ]}
                        >
                            {team.rank}
                        </Text>

                        <Text
                            style={[
                                styles.teamName,
                                team.isUser && styles.userTeamName,
                            ]}
                        >
                            {team.team}
                        </Text>

                        <Text
                            style={[
                                styles.points,
                                team.isUser && styles.userText,
                            ]}
                        >
                            {team.points}
                        </Text>
                    </View>
                ))}
            </View>

            <Text style={styles.caption}>
                Tap to view full standings.
            </Text>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    widget: {
        width: 329,
        minHeight: 268,
        padding: 16,

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#E2ECF1",
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

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    title: {
        fontSize: 13,
        fontWeight: "700",
        color: "#0D1520",
    },

    rankSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    rankLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#7A8694",
    },

    rankValue: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2E903B",
    },

    standingsList: {
        marginTop: 12,
        gap: 6,
    },

    standingRow: {
        minHeight: 30,
        paddingHorizontal: 10,

        flexDirection: "row",
        alignItems: "center",

        borderRadius: 10,
    },

    userRow: {
        backgroundColor: "#E6F4E8",
    },

    position: {
        width: 16,
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
        color: "#7A8694",
    },

    teamName: {
        flex: 1,
        marginLeft: 8,
        fontSize: 12,
        fontWeight: "400",
        color: "#0D1520",
    },

    points: {
        fontSize: 12,
        fontWeight: "700",
        color: "#0D1520",
    },

    userText: {
        color: "#2E903B",
    },

    userTeamName: {
        fontWeight: "600",
        color: "#1F5C28",
    },

    caption: {
        marginTop: 12,
        fontSize: 11,
        fontWeight: "400",
        textAlign: "center",
        color: "#7A8694",
    },
});