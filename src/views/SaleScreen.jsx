import React, { useState } from "react";
import CardSaleApp from "../components/CardSaleApp";

const SaleScreen = ({darkMode}) => {
  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  };

const handletime = () => {
  const now = new Date();
  const formattedDateTime = [
    now.toLocaleDateString(),
    `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`,
  ];
  setDateTime(formattedDateTime);
  handleOpen();
};


  return (
    <div>
      <CardSaleApp
        darkMode={darkMode}
        handleOpen={handleOpen}
        open={open}
        handletime={handletime}
        dateTime={dateTime}
      />
    </div>
  );
};

export default SaleScreen;
