import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EventWidget() {
    return (
        <View style={styles.widget}>

            <View>
                <View style={styles.brandRow}>
                    <View style={styles.brandIcon}>
                        <Ionicons
                            name="tennisball-outline"
                            size={11}
                            color="#FFFFFF"
                        />
                    </View>

                    <Text style={styles.brandText}>
                        OpenSports
                    </Text>
                </View>

                <Text style={styles.eventName}>
                    Tuesday Pickleball
                </Text>

                <Text style={styles.eventDetails}>
                    6:30 PM · East Side Rec
                </Text>
            </View>

            {/*
                The Check In control represents the quick action
                available from the widget concept.
            */}
            <Pressable
                style={styles.checkInButton}
                onPress={() => {
                    // Connect to the player check-in flow later.
                }}
            >
                <View style={styles.statusDot} />

                <Text style={styles.checkInText}>
                    Check In
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    widget: {
        width: 155,
        height: 155,
        padding: 14,
        justifyContent: "space-between",
        backgroundColor: "#2E903B",
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

    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    brandIcon: {
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },

    brandText: {
        fontSize: 10,
        fontWeight: "600",
        color: "rgba(255,255,255,0.7)",
    },

    eventName: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    eventDetails: {
        marginTop: 2,
        fontSize: 11,
        fontWeight: "400",
        color: "rgba(255,255,255,0.7)",
    },

    checkInButton: {
        width: "100%",
        height: 29,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 10,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#FFD230",
    },

    checkInText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});