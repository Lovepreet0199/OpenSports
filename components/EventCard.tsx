import { StyleSheet, Text, View } from "react-native";

type EventCardProps = {
    format: string;
    courtCount: number;
    location: string;
    time: string;
};

export default function EventCard({
    format,
    courtCount,
    location,
    time,
}: EventCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.eventDetails}>
                {format} · {courtCount} courts
            </Text>

            <Text style={styles.locationDetails}>
                {location} · {time}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#2E903B",
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 25,
        marginTop: 20,
    },

    eventDetails: {
        color: "#FFFFFF",
        fontSize: 19,
    },

    locationDetails: {
        color: "#FFFFFF",
        fontSize: 19,
        marginTop: 10,
    },
});