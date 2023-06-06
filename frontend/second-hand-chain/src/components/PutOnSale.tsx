import { FormEvent, useRef, useState } from "react";
import isPhoneOnSale from "../services/isPhoneOnSale";
import putPhoneOnSale from "../services/putPhoneOnSale";
import Alert from "./Alert";
import removePhoneFromSale from "../services/removePhoneFromSale";
import buyPhone from "../services/buyPhone";

interface Props {
  id: Number;
  isOwned: boolean;
}

export const PutOnSale = ({ id, isOwned }: Props) => {
  const [isOnSale, setIsOnSale] = useState(false);
  const [errors, setErrors] = useState("");
  const [visibleErrors, setVisibleErrors] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");

  isPhoneOnSale(id).then((res) => {
    if (res) {
      setIsOnSale(res);
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
      putPhoneOnSale(id.toString(), setPriceRef.current.value).then((res) => {
        if (res != "" && res != undefined) {
          setErrors("https://sepolia.etherscan.io/tx/".concat(res?.toString()));
          setVisibleErrors(true);
          setTypeAlert("alert-success");
        }
      });
    }
  };

  const remove = () => {
    removePhoneFromSale(id.toString()).then((res) => {
      if (res != "" && res != undefined) {
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
          <h4 className="link-success">Is on sale</h4>
          <br />
          <form onSubmit={handleSubmitPutOnSale}>
            <div className="form-control justify-center">
              <input
                ref={setPriceRef}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full max-w-xs justify-center"
              />
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
              <input
                ref={setPriceRef}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full max-w-xs justify-center"
              />
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

      {isOwned==false && isOnSale && <><button className="btn btn-success" onClick={()=>buyPhone(id)}>
            Buy Phone
          </button></>}
    </>
  );
};
