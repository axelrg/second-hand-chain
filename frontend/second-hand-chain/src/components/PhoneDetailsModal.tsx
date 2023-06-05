import { useState } from "react";
import isPhoneOnSale from "../services/isPhoneOnSale";
import { PutOnSale } from "./PutOnSale";

interface Phone {
  id:Number
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

interface Props {
  phone: Phone;
  visible: boolean;
  onHide: () => void;
  isOwned: boolean
}

export const PhoneDetailsModal = ({ phone, visible, onHide, isOwned }: Props) => {

  var table = [];

  for (let i = 0; i < phone.owners.length; i++) {
    var time = Number(phone.saleTime[i].toString()) * 1000;
    var timeFormatted = new Date(time);

    table.push({
      index: i,
      owner: phone.owners[i],
      price: phone.salePrice[i],
      time: timeFormatted.toLocaleDateString(),
    });

  }

  return (
    <>
      <input
        type="checkbox"
        id="my-modal-4"
        className="modal-toggle"
        checked={visible}
        onClick={() => onHide()}
        readOnly
      />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative max-w-3xl" htmlFor="">
          <h3 className="text-lg font-bold text-primary">{phone.brand}</h3>
          <h3 className="text-lg font-bold text-primary">{phone.model}</h3>

          <p className="py-4 justify-center">RAM (Gb):&nbsp;&nbsp;&nbsp;</p>
          <div className="badge badge-primary">{phone.ram}</div>

          <p className="py-4 justify-center">Colour:&nbsp;&nbsp;&nbsp;</p>
          <div className="badge badge-primary">{phone.colour}</div>

          <p className="py-4 justify-center">Storage (Gb):&nbsp;&nbsp;&nbsp;</p>
          <div className="badge badge-primary">{phone.mem}</div>

          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <td>Index</td>
                  <td>Owner</td>
                  <td>Buy price</td>
                  <td>Date</td>
                </tr>
              </thead>
              <tbody>
                {table.map((row) => (
                  <tr>
                    <td>{row.index}</td>
                    <td>{row.owner}</td>
                    <td>{row.price}</td>
                    <td>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PutOnSale id={phone.id}></PutOnSale>
        </label>
      </label>
    </>
  );
};
