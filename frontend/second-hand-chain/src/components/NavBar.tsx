import React, { useState } from "react";
import { WalletButton } from "./WalletButton";
import MintPhoneModal from "./MintPhoneModal";

interface Props {
  changeFetchedPhones: (e: React.MouseEvent, title: string) => void;
}

export const NavBar = ({ changeFetchedPhones }: Props) => {
  const [modalMintVisible, setMintVisibility] = useState<boolean>(false);
  const [buttonSelected, setbuttonSelected] = useState<string>("phonesOnSale");
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div tabIndex={10} className=" z-40 dropdown">
            <label tabIndex={10} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={10}
              className=" z-40 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                {buttonSelected == "ownedPhones" && (
                  <a
                    onClick={(e) => {
                      changeFetchedPhones(e, "ownedPhones");
                      setbuttonSelected("ownedPhones");
                    }}
                  >
                    Your Phones
                    <div className="badge badge-sm badge-primary"></div>
                  </a>
                )}
                {buttonSelected != "ownedPhones" && (
                  <a
                    onClick={(e) => {
                      changeFetchedPhones(e, "ownedPhones");
                      setbuttonSelected("ownedPhones");
                    }}
                  >
                    Your Phones
                  </a>
                )}
              </li>
              <li>
                {buttonSelected == "phonesOnSale" && (
                  <a
                    onClick={(e) => {
                      changeFetchedPhones(e, "phonesOnSale");
                      setbuttonSelected("phonesOnSale");
                    }}
                  >
                    Phones On Sale
                    <div className="badge badge-sm badge-primary"></div>
                  </a>
                )}
                {buttonSelected != "phonesOnSale" && (
                  <a
                    onClick={(e) => {
                      changeFetchedPhones(e, "phonesOnSale");
                      setbuttonSelected("phonesOnSale");
                    }}
                  >
                    Phones On Sale
                  </a>
                )}
              </li>
              <li>
                <a onClick={() => setMintVisibility(true)}>Create Phone</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">SHC</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={() => setMintVisibility(true)}>Create Phone</a>
            </li>
            <li>
              {buttonSelected == "ownedPhones" && (
                <a
                  onClick={(e) => {
                    changeFetchedPhones(e, "ownedPhones");
                    setbuttonSelected("ownedPhones");
                  }}
                >
                  Your Phones
                  <div className="badge badge-sm badge-primary"></div>
                </a>
              )}
              {buttonSelected != "ownedPhones" && (
                <a
                  onClick={(e) => {
                    changeFetchedPhones(e, "ownedPhones");
                    setbuttonSelected("ownedPhones");
                  }}
                >
                  Your Phones
                </a>
              )}
            </li>
            <li>
              {buttonSelected == "phonesOnSale" && (
                <a
                  onClick={(e) => {
                    changeFetchedPhones(e, "phonesOnSale");
                    setbuttonSelected("phonesOnSale");
                  }}
                >
                  Phones On Sale
                  <div className="badge badge-sm badge-primary"></div>
                </a>
              )}
              {buttonSelected != "phonesOnSale" && (
                <a
                  onClick={(e) => {
                    changeFetchedPhones(e, "phonesOnSale");
                    setbuttonSelected("phonesOnSale");
                  }}
                >
                  Phones On Sale
                </a>
              )}
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <WalletButton></WalletButton>
        </div>
      </div>

      {modalMintVisible && (
        <MintPhoneModal
          visible={modalMintVisible}
          onHide={() => setMintVisibility(false)}
        />
      )}
    </>
  );
};
