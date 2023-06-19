import { useState } from "react";
import { PhoneDetailsModal } from "./PhoneDetailsModal";
import Web3 from "web3";
import hardDriveIcon from "./../../public/hard-drive-svgrepo-com.svg";
import ramIcon from "./../../public/ram-memory-ram-svgrepo-com.svg";
import colourIcon from "./../../public/palette-svgrepo-com.svg";
import { NFTStorage } from "nft.storage";

interface Props {
  phone: Phone;
  isOwned: boolean;
}

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
interface NFTStorageResponse {
  name: string;
  image: string;
}

export const Card = ({ phone, isOwned }: Props) => {
  const [modalPhoneCardVisible, setmodalPhoneCardVisibility] =
    useState<boolean>(false);

  const [imageR, setImageR] = useState<string>("");

  async function getImage(url: string) {
    var gatewayUrl = url.replace("ipfs://", "https://nftstorage.link/ipfs/");
    var response = await fetch(gatewayUrl);
    var data: NFTStorageResponse = await response.json();
    return data.image.replace("ipfs://", "https://nftstorage.link/ipfs/");
  }

  var image = "";

  getImage(phone.url).then((res) => {
    console.log(res);
    image = res;
    setImageR(image);
  });

  return (
    <>
      <div>
        <div className=" card card-compact w-96 shadow-xl bg-accent-focus over">
          <figure>
            <img src={imageR} />
          </figure>

          <div className="card-body">
            <div className="tooltip" data-tip="Model">
              <h2 className="card-title justify-center">{phone.model}</h2>
            </div>
            <div className="tooltip" data-tip="Brand">
              <h2 className="card-title justify-center">{phone.brand}</h2>
            </div>
            <div className="flex w-full">
              <div className="grid h-20 flex-grow card bg-accent-focus rounded-box place-items-center">
                <p>
                  <div className="tooltip" data-tip="Storage (Gb)">
                    <img
                      src={hardDriveIcon}
                      alt="Memory"
                      className="inline w-2/12"
                    />
                    {phone.mem}
                  </div>
                </p>

                <p>
                  <div className="tooltip" data-tip="RAM (Gb)">
                    <img src={ramIcon} alt="RAM" className="inline w-2/12" />
                    {phone.ram}
                  </div>
                </p>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="grid h-20 flex-grow card bg-accent-focus rounded-box place-items-center">
                <p>
                  <div className="tooltip" data-tip="Colour">
                    <img
                      src={colourIcon}
                      alt="Colour"
                      className="inline w-2/12"
                    />
                    {phone.colour}
                  </div>
                </p>
              </div>
            </div>

            <div className="card-actions justify-end">
              {isOwned == false && (
                <button
                  className="btn btn-primary"
                  onClick={() => setmodalPhoneCardVisibility(true)}
                >
                  Buy {Web3.utils.fromWei(phone.price.toString())} (ETH)
                </button>
              )}
              {isOwned && (
                <button
                  className="btn btn-primary"
                  onClick={() => setmodalPhoneCardVisibility(true)}
                >
                  Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalPhoneCardVisible && (
        <PhoneDetailsModal
          isOwned={isOwned}
          phone={phone}
          visible={modalPhoneCardVisible}
          onHide={() => setmodalPhoneCardVisibility(false)}
        />
      )}
    </>
  );
};
