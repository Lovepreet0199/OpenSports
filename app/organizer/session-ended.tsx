import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SessionEndedScreen() {
    const router = useRouter();

    /*
        This screen is only a short confirmation state.

        After the organizer sees that the session ended successfully,
        we automatically return them to the organizer home screen.
    */
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/organizer");
        }, 2500);

        /*
            We clear the timer if the screen is removed before
            the delay finishes. This prevents the timer from
            continuing after the component is gone.
        */
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/*
                    The green confirmation icon communicates that
                    the session was ended successfully.
                */}
                <View style={styles.confirmation}>

                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="checkmark"
                            size={36}
                            color="#2E903B"
                        />
                    </View>

                    <View style={styles.messageSection}>
                        <Text style={styles.title}>
                            Session ended
                        </Text>

                        <Text style={styles.message}>
                            All scores logged.
                        </Text>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    confirmation: {
        width: 187,
        alignItems: "center",
        gap: 24,
    },

    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#D1EAD4",
        justifyContent: "center",
        alignItems: "center",
    },

    messageSection: {
        width: 187,
        gap: 12,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#47526C",
        textAlign: "center",
    },

    message: {
        fontSize: 14,
        fontWeight: "400",
        color: "#9099B0",
        textAlign: "center",
    },
});