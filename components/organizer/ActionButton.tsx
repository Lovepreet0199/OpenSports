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
                isDispute
                    ? styles.disputeButton
                    : styles.normalButton,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.buttonText,
                    isDispute
                        ? styles.disputeText
                        : styles.normalText,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 55,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
    },

    normalButton: {
        backgroundColor: "#2E903B",
    },

    disputeButton: {
        backgroundColor: "#F78D2C",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    normalText: {
        color: "#FFFFFF",
    },

    disputeText: {
        color: "#FFFFFF",
    },
});