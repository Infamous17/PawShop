import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const accountInfo = JSON.parse(localStorage.getItem("userInfo"));
        setAccount(accountInfo);

    }, [navigate]);

    return (
        <AccountContext.Provider value={{ account, setAccount, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}>
            {children}
        </AccountContext.Provider>
    );
}

export const AccountState = () => {
    return useContext(AccountContext);
}

export default AccountProvider;