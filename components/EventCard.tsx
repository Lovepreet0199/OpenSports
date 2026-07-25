import { StyleSheet, Text, View } from "react-native";

type EventCardProps = {
    eventName?: string;
    format: string;
    courtCount: number;
    location: string;
    time: string;
};

export default function EventCard({
    eventName,
    format,
    courtCount,
    location,
    time,
}: EventCardProps) {
    return (

        <View style={styles.card}>
            {eventName && (
                <Text style={styles.eventName}>
                    {eventName}
                </Text>
            )}
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
        marginBottom: 20,
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
    eventName: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 12,
    },
});