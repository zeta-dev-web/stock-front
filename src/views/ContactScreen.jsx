import React from 'react'

const ContactScreen = ({ darkMode }) => {
  return (
    <div>
      <h1 className={`text-center ${
            darkMode ? "text-light" : ""
          }`}>Formulario de Contacto</h1>
    </div>
  );
};

export default ContactScreen