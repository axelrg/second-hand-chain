import { useState } from "react";
import usePhones from "./hooks/usePhones";
import { Card } from "./components/Card";
import { NavBar } from "./components/NavBar";
import useOnSalePhones from "./hooks/useOnSalePhones";
import useOwnedPhones from "./hooks/useOwnedPhones";
import { WebsiteDescription } from "./components/WebsiteDescription";

interface Phone {
  id: Number;
  model: string;
  brand: string;
  colour: string;
  ram: BigInteger;
  mem: BigInteger;
  owners: string[];
  saleTime: BigInteger[];
  salePrice: BigInteger[];
  price: BigInteger;
  url: string;
}

const App = () => {
  const [fetchPhones, setFetchPhones] = useState<string>("introduction");

  const changeFetchedPhones = (e: React.MouseEvent, title: string) => {
    setFetchPhones(title);
  };

  return (
    <>
      <NavBar
        changeFetchedPhones={(e, title) => changeFetchedPhones(e, title)}
      ></NavBar>
      <br />
      <div></div>
      <div className="gap-6 ">
        <ul className="flex flex-wrap justify-center gap-6">
          {fetchPhones == "ownedPhones" &&
            useOwnedPhones(fetchPhones).map((phone, index) => (
              <li>
                <Card phone={phone} isOwned={true}></Card>
              </li>
            ))}
          {fetchPhones == "phonesOnSale" &&
            useOnSalePhones(fetchPhones).map((phone, index) => (
              <li>
                <Card phone={phone} isOwned={false}></Card>
              </li>
            ))}

          {fetchPhones == "introduction" && useOnSalePhones(fetchPhones) && (
            <WebsiteDescription />
          )}
        </ul>
      </div>
    </>
  );
};

export default App;
