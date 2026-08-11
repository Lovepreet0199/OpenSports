import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


type AppHeaderProps = {
    title: string;
    onBack?: () => void;
};

export default function AppHeader({ title, onBack }: AppHeaderProps) {


    return (
        <>
            <View style={styles.header}>
                <Pressable
                    style={styles.iconButton}
                    onPress={onBack}
                >
                    <MaterialIcons name="arrow-back" style={styles.icon} />

                </Pressable>


                <Text style={styles.title}>{title}</Text>

                <Pressable style={styles.iconButton}>
                    <Text style={styles.moreIcon}>•••</Text>
                </Pressable>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    iconButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        fontSize: 36,
        color: "#1F1F1F",
        lineHeight: 38,
    },

    moreIcon: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1F1F1F",
        letterSpacing: 2,
    },

    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: "700",
        color: "#1F1F1F",
        textAlign: "center",
    },
});