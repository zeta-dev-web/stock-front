import React from "react";
import ContactApp from "../components/ContactApp";

import "../css/Contact.css";

const ContactScreen = ({ darkMode }) => {
  return (
    <div className="vh-100">
      <ContactApp darkMode={darkMode} />
    </div>
  );
};

export default ContactScreen;
