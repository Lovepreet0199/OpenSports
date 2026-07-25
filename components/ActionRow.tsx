import { StyleSheet, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ActionRowProps = {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
};

export default function ActionRow({ iconName, title }: ActionRowProps) {
    return (

        <Pressable style={styles.actionRow}>
            <View style={styles.leftContent}>
                <Ionicons
                    name={iconName}
                    size={22}
                    color="#9B9B9B"
                />

                <Text style={styles.title}>
                    {title}
                </Text>
            </View>


            <Ionicons
                name="chevron-forward"
                size={20}
                color="black"
            />

        </Pressable>

    );
}


const styles = StyleSheet.create({
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 55,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },

    leftContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937",
    },
});