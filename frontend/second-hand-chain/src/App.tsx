import { useState } from "react";
import MintPhoneModal from "./components/MintPhoneModal";
import connectWallet from "./services/connectWallet";
import createPhone from "./services/createPhone";
import usePhones from "./hooks/usePhones";
import { Card } from "./components/Card";
import { NavBar } from "./components/NavBar";

const App = () => {
  const phones = usePhones();
  return (
    <>
      <NavBar></NavBar>
      <div></div>
      <div className=" gap-6">
        <ul className="flex flex-wrap justify-center gap-6">
          {phones.map((phone, index) => (
            <li>
              <Card phone={phone}></Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
