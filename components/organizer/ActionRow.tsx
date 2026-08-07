import { Pressable, StyleSheet, Text } from "react-native";

type ActionButtonProps = {
    title: string;
    onPress?: () => void;
    variant?: "normal" | "dispute";
};

export default function ActionButton({
    title,
    onPress,
    variant = "normal",
}: ActionButtonProps) {

    const isDispute = variant === "dispute";

    return (
        <Pressable
            style={[
                styles.button,
                isDispute ? styles.disputeButton : styles.normalButton,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.buttonText,
                    isDispute ? styles.disputeText : styles.normalText,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 44,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    normalButton: {
        backgroundColor: "#E8F5EA",
    },

    disputeButton: {
        backgroundColor: "#F78D2C",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "700",
    },

    normalText: {
        color: "#21652A",
    },

    disputeText: {
        color: "#FFFFFF",
    },
});