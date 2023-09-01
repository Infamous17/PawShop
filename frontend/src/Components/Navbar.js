import { useState } from "react";
import { AccountState } from "./Context/AccountProvider";
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false);
    const { account } = AccountState();

    const handleToggle = () => {
        setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    };

    const listingNavigator = () => {
        navigate("/listings");
    };

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/signin");
    };

    return (
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-dark">
                <a href="/" class="navbar-brand">PawShop</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded={isExpanded}
                    aria-label="Toggle navigation"
                    onClick={handleToggle}
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a href="/adoption" class="nav-link">Adopt A Pet</a>
                        </li>
                        <li class="nav-item">
                            <a href="/rehome" class="nav-link">ReHome A Pet</a>
                        </li>
                        {account ? <li class="nav-item">
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bgColor={"#ff4c68"} _hover={{ bgColor: "#ff4c68" }} _expanded={{ bgColor: "#ff4c68" }}>
                                    <Avatar size='md' cursor='pointer' name={account.data.name} bgColor="#f9fbe7" color="#ff4c68" />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => {
                                        navigate("/chat");
                                    }}>
                                        Messages
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={() => {
                                        navigate("/favorites");
                                    }}>
                                        Favorites
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={listingNavigator}>Listings</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </li>
                            :
                            <>
                                <li class="nav-item">
                                    <a href="/signin" class="nav-link">SignIn</a>
                                </li>
                                <li class="nav-item">
                                    <a href="/signup" class="nav-link">SignUp</a>
                                </li>
                            </>}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;