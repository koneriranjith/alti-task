import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import logo from "../../logo.svg";

interface NavigationItem {
  name: string;
  href: string;
}

const navigationData: NavigationItem[] = [
  { name: "Home", href: "" },
  { name: "Services", href: "services" },
  { name: "Gallery", href: "gallery" },
  { name: "Contact Us", href: "contact-us" },
];

const Navigation: React.FC = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </div>
      <ul>
        {navigationData.map((item) => (
          <li key={item.href}>
            <Link to={`/${item.href}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
