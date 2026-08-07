import { StyleSheet, Text, View } from "react-native";

type SessionCardProps = {
    date: string;
    time: string;
    checkedInPlayers: number;
    totalPlayers: number;
    location: string;
}

export default function SessionCard({ date, time, checkedInPlayers, totalPlayers, location }: SessionCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.date}>
                    &#128338;   {date} · {time}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.players}>
                    &#128101;   {checkedInPlayers} / {totalPlayers} players checked in
                </Text>
            </View>

            <View style={[styles.row, styles.lastRow]}>
                <Text style={styles.location}>&#128205;   {location}</Text>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    card: {
        width: "100%",
        minHeight: 224,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 16,
    },

    row: {
        paddingHorizontal: 18,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },

    lastRow: {
        borderBottomWidth: 0,
    },

    date: {
        fontSize: 17,
        color: "#1F1F1F",
    },

    players: {
        fontSize: 17,
        color: "#1F1F1F",
    },

    location: {
        fontSize: 17,
        color: "#1F1F1F",
    },
});