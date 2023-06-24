import Register from "./register.jsx";
import {useContext} from "react";

export default function Routes() {
    const {username, id} = useContext(UserContext);

    if (username) {
        return 'Logged in' + username;
    }
    return (
        <Register />
    )
}