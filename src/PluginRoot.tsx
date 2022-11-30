import {useEffect} from "react";
import {registerSidebarTool} from "@whiteboards-io/plugins";
import PluginIcon from "./PluginIcon.svg";

export default function PluginRoot() {
    useEffect(() => {
        const baseUrl = window.location.origin + window.location.pathname.replace(/^\/$/, '');
        registerSidebarTool({
            id: "whiteboards-tic-tac-toe",
            icon: baseUrl + PluginIcon,
            tooltip: "Tic tac toe",
            contentUrl: baseUrl + "?tic-tac-toe",
        });
    }, []);

    return null;
}