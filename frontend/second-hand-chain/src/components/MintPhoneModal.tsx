import { FormEvent, useRef, useState } from "react";
import Alert from "./Alert";
import createPhone from "../services/createPhone";
import isImeiRegistered from "../services/isImeiRegistered";
import nftStorage from "../services/nftStorage";

interface Props {
  visible: boolean;
  onHide: () => void;
}

interface Phone {
  model: string;
  brand: string;
  imei: string;
  colour: string;
  ram: string;
  mem: string;
  salePrice: string;
  price: string;
  image: File
}

const MintPhoneModal = ({ visible, onHide }: Props) => {
  const [errors, setErrors] = useState("");
  const [visibleErrors, setVisibleErrors] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");

  const imeiRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);
  const colourRef = useRef<HTMLInputElement>(null);
  const ramRef = useRef<HTMLInputElement>(null);
  const memRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const salePriceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      imeiRef !== null &&
      imeiRef.current !== null &&
      imeiRef.current.value !== "" &&
      modelRef !== null &&
      modelRef.current !== null &&
      modelRef.current.value !== "" &&
      brandRef !== null &&
      brandRef.current !== null &&
      brandRef.current.value !== "" &&
      colourRef !== null &&
      colourRef.current !== null &&
      colourRef.current.value !== "" &&
      ramRef !== null &&
      ramRef.current !== null &&
      ramRef.current.value !== "" &&
      memRef !== null &&
      memRef.current !== null &&
      memRef.current.value !== "" &&
      priceRef !== null &&
      priceRef.current !== null &&
      priceRef.current.value !== "" &&
      salePriceRef !== null &&
      salePriceRef.current !== null &&
      salePriceRef.current.value !== "" &&
      imageRef !== null &&
      imageRef.current !== null &&
      imageRef.current.files !== null
    ) {
      const phone: Phone = {
        model: modelRef.current.value,
        brand: brandRef.current.value,
        imei: imeiRef.current.value,
        colour: colourRef.current.value,
        ram: memRef.current.value,
        mem: memRef.current.value,
        salePrice: salePriceRef.current.value,
        price: priceRef.current.value,
        image: imageRef.current.files[0]
      };
      
      isImeiRegistered(phone.imei).then((res) => {
        if (res) {
          setErrors("Imei is already registered");
          setTypeAlert("alert-error");
          setVisibleErrors(true);
        } else {
          createPhone(phone).then((res) => {
            if (res == "You must log into Metamask") {
              setErrors(res);
              setVisibleErrors(true);
              setTypeAlert("alert-error");
            } else if (res != "" && res != undefined) {
              setErrors(
                "https://sepolia.etherscan.io/tx/".concat(res?.toString())
              );
              setVisibleErrors(true);
              setTypeAlert("alert-success");
            }
          });
        }
      });
    } else {
      setErrors("Empty fields are not allowed");
      setTypeAlert("alert-error");
      setVisibleErrors(true);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="my-modal-4"
        className="modal-toggle"
        checked={visible}
        onClick={() => onHide()}
      />

      <label
        htmlFor="my-modal-4"
        className="modal cursor-pointer justify-center"
      >
        <label className="modal-box relative justify-center" htmlFor="">
          <div className="justify-center">
            <h3 className="text-lg font-bold justify-center">Mint Phone NFT</h3>
          </div>
          {visibleErrors && (
            <Alert
              errorText={errors}
              typeAlert={typeAlert}
              onHide={() => setVisibleErrors(false)}
            ></Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-control justify-center">
              <div className="justify-center">
                <div className=" p-3">
                  <label htmlFor="brand" className="input-group ">
                    <span>Brand</span>
                    <input
                      ref={brandRef}
                      id="brand"
                      type="text"
                      placeholder="Xiaomi"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="model" className="input-group">
                    <span>Model</span>
                    <input
                      ref={modelRef}
                      id="model"
                      type="text"
                      placeholder="Redmi Note 5"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="imei" className="input-group">
                    <span>Imei</span>
                    <input
                      ref={imeiRef}
                      id="imei"
                      type="text"
                      placeholder="861324064585351"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="colour" className="input-group">
                    <span>Colour</span>
                    <input
                      ref={colourRef}
                      id="colour"
                      type="text"
                      placeholder="Red"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="ram" className="input-group">
                    <span>Ram (Gigabytes)</span>
                    <input
                      ref={ramRef}
                      id="ram"
                      type="number"
                      placeholder="8"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <input
                    ref={imageRef}
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>

                <div className=" p-3">
                  <label htmlFor="memory" className="input-group">
                    <span>Memory (Gigabytes)</span>
                    <input
                      ref={memRef}
                      id="memory"
                      type="number"
                      placeholder="128"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="price" className="input-group">
                    <span>Price (ETH)</span>
                    <input
                      ref={priceRef}
                      id="price"
                      type="text"
                      placeholder="0.03"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="salePrice" className="input-group">
                    <span>Sale Price (ETH)</span>
                    <input
                      ref={salePriceRef}
                      id="salePrice"
                      type="text"
                      placeholder="0.025"
                      className="input input-bordered"
                    />
                  </label>
                </div>
              </div>

              <input
                type="submit"
                value="Mint"
                className="btn justify-center"
              />
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default MintPhoneModal;
