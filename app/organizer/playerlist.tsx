import AppHeader from "@/components/AppHeader";
import PlayerList from "@/components/PlayerList";

export default function playerList() {
    return (
        <>
            <AppHeader title="Players list" />
            <PlayerList
                checkbox="false"
                name="Omar" />
        </>
    );
}