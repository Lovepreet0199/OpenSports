import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ActionRowProps = {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress?: () => void;
};

export default function ActionRow({
    iconName,
    title,
    onPress,
}: ActionRowProps) {
    return (
        <Pressable
            style={styles.actionRow}
            onPress={onPress}
        >
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
                color="#9B9B9B"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    actionRow: {
        width: "100%",
        minHeight: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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