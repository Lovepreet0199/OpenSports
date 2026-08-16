import EventWidget from "@/components/player/widgets/EventWidget";
import LiveMatchWidget from "@/components/player/widgets/LiveMatchWidget";
import DisputeStatusWidget from "@/components/player/widgets/DisputeStatusWidget";
import StandingsWidget from "@/components/player/widgets/StandingsWidget";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, Pressable, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function WidgetsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {/*
                    This page demonstrates the Home Screen widget
                    concepts from the Figma prototype.

                    These are React Native representations for the
                    prototype, not native iOS WidgetKit widgets.
                */}
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={18}
                        color="#2E903B"
                    />

                </Pressable>

                <View style={styles.headingSection}>
                    <Text style={styles.title}>
                        iPhone Widgets
                    </Text>
                </View>

                <View style={styles.widgetSection}>
                    <Text style={styles.sectionLabel}>
                        SMALL · TODAY&apos;S EVENT
                    </Text>

                    <EventWidget />

                    <View style={styles.widgetSection}>
                        <Text style={styles.sectionLabel}>
                            MEDIUM · LIVE MATCH
                        </Text>

                        <LiveMatchWidget
                            onReportIssue={() => {
                                // We can connect this to the existing player
                                // dispute flow after the widget UI is complete.
                            }}
                        />
                    </View>

                    <View style={styles.widgetSection}>
                        <Text style={styles.sectionLabel}>
                            MEDIUM · DISPUTE STATUS
                        </Text>

                        <DisputeStatusWidget
                            onReviewDispute={() =>
                                router.push({
                                    pathname: "/organizer/dispute",
                                    params: {
                                        courtNumber: 2,
                                        teamOne: "Simon & John G.",
                                        teamTwo: "Leo & Maria",
                                        teamOneScore: 5,
                                        teamTwoScore: 6,
                                        reportedTeamOneScore: 7,
                                        reportedTeamTwoScore: 6,
                                        reportedBy: "Simon",
                                        isContested: "false",
                                    },
                                })
                            }
                        />
                    </View>

                    <View style={styles.widgetSection}>
                        <Text style={styles.sectionLabel}>
                            LARGE · TOURNAMENT STANDINGS
                        </Text>

                        <StandingsWidget
                            onPress={() => {
                                // Connect to the full standings screen later.
                            }}
                        />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    scrollView: {
        flex: 1,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    backButton: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 2,
    },

    backText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#2E903B",
    },

    headingSection: {
        marginTop: 14,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1E293B",
    },

    subtitle: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: "400",
        color: "#7A8694",
    },

    widgetSection: {
        marginTop: 20,
    },

    sectionLabel: {
        marginBottom: 10,
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 0.6,
        color: "#7A8694",
    },
});