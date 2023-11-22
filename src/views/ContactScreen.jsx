import React from "react";
import ContactApp from "../components/ContactApp";

import "../css/Contact.css";

const ContactScreen = ({ darkMode }) => {
  return (
    <div className="h-100 fondo">
      <ContactApp darkMode={darkMode} />
    </div>
  );
};

export default ContactScreen;
