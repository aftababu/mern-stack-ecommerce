import { ReactNavbar } from "overlay-navbar";
import {Search,ShoppingCart,People} from '@mui/icons-material'
import logo from "/images/logo.png";

const options = {
  burgerColor :	"orange",
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "#fff",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  searchIcon: true,
  SearchIconElement: Search,
  searchIconUrl: "/search", // Set the URL for the search icon
  searchIconSize: "2vmax",
  searchIconTransition: 0.5,
  searchIconAnimationTime: 2,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover: "#eb4034",
  searchIconMargin: "1vmax", 
  cartIcon: true,
  CartIconElement: ShoppingCart,
  cartIconColor: "rgba(35, 35, 35, 0.8)",
  cartIconColorHover: "#eb4034", // Hover color for the cart icon
  cartIconSize: "2vmax",
  cartIconTransition: 0.5,
  cartIconAnimationTime: 2,
   cartIconMargin: "1vmax", 
  profileIcon: true,
  ProfileIconElement: People,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35, 0.8)",
  profileIconColorHover: "#eb4034", // Hover color for the profile icon
  profileIconSize: "2vmax",
  profileIconTransition: 0.5,
  profileIconAnimationTime: 2,
    profileIconMargin: "1vmax", 
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
