import { StyleSheet, Pressable, Text, View } from "react-native";
import Checkbox from 'expo-checkbox';

type PlayerListProps = {
    checkbox: boolean;
    name: string;
}
export default function PlayerList({ checkbox, name }: PlayerListProps) {
    return (
        <View style={styles.playerCard}>
            <Checkbox>{checkbox}</Checkbox>
            <Text>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    playerCard: {
        flex: 1,
    }
})