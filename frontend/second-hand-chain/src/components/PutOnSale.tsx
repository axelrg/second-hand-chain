import { FormEvent, useRef, useState } from "react";
import isPhoneOnSale from "../services/isPhoneOnSale";
import putPhoneOnSale from "../services/putPhoneOnSale";
import Alert from "./Alert";
import removePhoneFromSale from "../services/removePhoneFromSale";
import buyPhone from "../services/buyPhone";
import Web3 from "web3";
import checkWalletDontOwnPhone from "../services/checkWalletDontOwnPhone";

interface Props {
  id: Number;
  isOwned: boolean;
  price: string;
}

export const PutOnSale = ({ id, isOwned, price }: Props) => {
  const [isOnSale, setIsOnSale] = useState(false);
  const [isOnSaleOwned, setIsOnSaleOwned] = useState(false);
  const [errors, setErrors] = useState("");
  const [visibleErrors, setVisibleErrors] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [buyButtonAlert, setBuyButtonAlert] = useState("");

  isPhoneOnSale(id).then((res) => {
    if (res) {
      setIsOnSale(res);
    }
  });

  checkWalletDontOwnPhone(id).then((res) => {
    if (res == "true") {
      setIsOnSaleOwned(true);
      setBuyButtonAlert("You Own This Phone");
    } else if (res == "false") {
      setIsOnSaleOwned(false);
    } else {
      setIsOnSaleOwned(true);
      setBuyButtonAlert(res);
    }
  });

  const setPriceRef = useRef<HTMLInputElement>(null);

  const handleSubmitPutOnSale = (event: FormEvent) => {
    event.preventDefault();
    if (
      setPriceRef !== null &&
      setPriceRef.current !== null &&
      setPriceRef.current.value !== ""
    ) {
      putPhoneOnSale(id.toString(), setPriceRef.current.value.toString()).then(
        (res) => {
          if (
            res != "" &&
            res != undefined &&
            res == "You must log into Metamask"
          ) {
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
        }
      );
    }
  };

  const buttonBuyPhone = (id: Number, price: string) => {
    buyPhone(id, price).then((res) => {
      if (
        res != "" &&
        res != undefined &&
        res != "You must log into Metamask"
      ) {
        setErrors("https://sepolia.etherscan.io/tx/".concat(res?.toString()));
        setVisibleErrors(true);
        setTypeAlert("alert-success");
      }
    });
  };

  const remove = () => {
    removePhoneFromSale(id.toString()).then((res) => {
      if (
        res != "" &&
        res != undefined &&
        res != "You must log into Metamask"
      ) {
        setErrors("https://sepolia.etherscan.io/tx/".concat(res?.toString()));
        setVisibleErrors(true);
        setTypeAlert("alert-success");
      }
    });
  };

  return (
    <>
      {visibleErrors && (
        <Alert
          errorText={errors}
          typeAlert={typeAlert}
          onHide={() => setVisibleErrors(false)}
        ></Alert>
      )}
      {isOwned && isOnSale && (
        <>
          <br />
          <h2 className="link-success justify-center">
            Is on sale for {Web3.utils.fromWei(price)} ETH
          </h2>
          <br />
          <form onSubmit={handleSubmitPutOnSale}>
            <div className="form-control justify-center">
              <div className=" p-3">
                <label htmlFor="salePrice" className="input-group">
                  <span>Sale Price (ETH)</span>
                  <input
                    ref={setPriceRef}
                    type="text"
                    placeholder="0.025"
                    className="input input-bordered"
                  />
                </label>
              </div>
              <br />
              <input
                type="submit"
                value="Change price"
                className="btn btn-success"
              />
              <br />
            </div>
          </form>
          <button className="btn btn-error" onClick={() => remove()}>
            Remove from sale
          </button>
          <br />
        </>
      )}
      {isOwned && isOnSale == false && (
        <>
          <br />
          <h4 className=" link-error">IS not on sale</h4>
          <br />
          <form onSubmit={handleSubmitPutOnSale}>
            <div className="form-control justify-center">
              <div className=" p-3">
                <label htmlFor="salePrice" className="input-group">
                  <span>Sale Price (ETH)</span>
                  <input
                    ref={setPriceRef}
                    type="text"
                    placeholder="0.025"
                    className="input input-bordered"
                  />
                </label>
              </div>
              <br />
              <input
                type="submit"
                value="Put on sale"
                className="btn btn-success"
              />
              <br />
            </div>
          </form>
        </>
      )}

      {isOnSaleOwned == false && isOwned == false && isOnSale && (
        <>
          <br />
          <button
            className="btn btn-success"
            onClick={() => buttonBuyPhone(id, price)}
          >
            Buy Phone For {Web3.utils.fromWei(price)}(ETH)
          </button>
        </>
      )}

      {isOnSaleOwned && isOwned == false && isOnSale && (
        <>
          <br />
          <div className="indicator">
            <span className="indicator-item badge badge-error">
              {buyButtonAlert}
            </span>
            <button className="btn btn-disabled">
              Buy Phone For {Web3.utils.fromWei(price)}(ETH)
            </button>
          </div>
        </>
      )}
    </>
  );
};
