interface Props {
  phone: Phone;
}

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

export const Card = ({ phone }: Props) => {
  return (
    <>
      <div>
        <div className=" card card-compact w-96 shadow-xl bg-accent-focus">
          <figure>
            <img src="https://www.visitbigsky.com/sites/default/files/styles/scale_1024/public/2021-04/Yellowstone%202.jpg?itok=SBK8geOF" />
          </figure>
          <div className="card-body">
            <p>{phone.model}</p>
            <p>{phone.brand}</p>
            <p>{phone.colour}</p>
            <p>{phone.ram}</p>
            <p>{phone.mem}</p>
            <p>{phone.price}</p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};