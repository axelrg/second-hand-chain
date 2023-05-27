import { useState } from "react";
import usePhones from "./hooks/usePhones";
import { Card } from "./components/Card";
import { NavBar } from "./components/NavBar";
import useOnSalePhones from "./hooks/useOnSalePhones";
import useOwnedPhones from "./hooks/useOwnedPhones";

interface Phone {
  model: string;
  brand: string;
  colour: string;
  ram: BigInteger;
  mem: BigInteger;
  owners: string[];
  saletime: BigInteger[];
  salePrice: BigInteger[];
  price: BigInteger;
}

const App = () => {
  const [fetchPhones, setFetchPhones] = useState<string>("ownedPhones");

  const changeFetchedPhones = (e: React.MouseEvent, title: string) => {
    console.log(fetchPhones);
    setFetchPhones(title);
  };

  var usephones = useOwnedPhones();

  var phones = useOnSalePhones();

  return (
    <>
      <NavBar
        changeFetchedPhones={(e, title) => changeFetchedPhones(e, title)}
      ></NavBar>
      <div></div>
      <div className=" gap-6">
        <ul className="flex flex-wrap justify-center gap-6">
          {fetchPhones == "ownedPhones" &&
            usephones.map((phone, index) => (
              <li>
                <Card phone={phone}></Card>
              </li>
            ))}
          {fetchPhones == "phonesOnSale" &&
            phones.map((phone, index) => (
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
