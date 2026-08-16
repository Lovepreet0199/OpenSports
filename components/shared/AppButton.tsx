import { Pressable, StyleSheet, Text } from "react-native";

type AppButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
};

export default function AppButton({
    title,
    onPress,
    variant = "primary",
}: AppButtonProps) {

    /*
        Choose the button and text styles based on the variant.

        This lets the same reusable AppButton support:
        - primary actions
        - secondary actions
        - destructive actions such as End session
    */
    const buttonStyle =
        variant === "primary"
            ? styles.primaryButton
            : variant === "danger"
                ? styles.dangerButton
                : styles.secondaryButton;

    const textStyle =
        variant === "primary"
            ? styles.primaryText
            : variant === "danger"
                ? styles.dangerText
                : styles.secondaryText;

    return (
        <Pressable
            style={[
                styles.button,
                buttonStyle,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.buttonText,
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 60,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    primaryButton: {
        backgroundColor: "#2E903B",
    },

    secondaryButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E2E2",
    },

    dangerButton: {
        backgroundColor: "#E64543",
    },

    buttonText: {
        fontSize: 18,
        fontWeight: "700",
    },

    primaryText: {
        color: "#FFFFFF",
    },

    secondaryText: {
        color: "#111111",
    },

    dangerText: {
        color: "#FFFFFF",
    },
});