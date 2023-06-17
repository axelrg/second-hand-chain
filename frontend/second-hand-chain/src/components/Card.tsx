import { useState } from "react";
import { PhoneDetailsModal } from "./PhoneDetailsModal";
import Web3 from "web3";
import hardDriveIcon from "./../../public/hard-drive-svgrepo-com.svg";
import ramIcon from "./../../public/ram-memory-ram-svgrepo-com.svg";
import colourIcon from "./../../public/palette-svgrepo-com.svg";

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
}

export const Card = ({ phone, isOwned }: Props) => {
  const [modalPhoneCardVisible, setmodalPhoneCardVisibility] =
    useState<boolean>(false);
  return (
    <>
      <div>
        <div className=" card card-compact w-96 shadow-xl bg-accent-focus over">
          <figure>
            <img src="https://media.istockphoto.com/id/1135715079/photo/yellowstone-national-park-wyoming-usa.jpg?s=612x612&w=0&k=20&c=ZWAnLEFlZHLSZYo7JLx2bgvPEL29jOdIk0_MRdTreB0=" />
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
