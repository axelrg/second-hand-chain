interface Props {
  visible: boolean;
  onHide: () => void;
}

const MintPhoneModal = ({ visible, onHide }: Props) => {
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
          <form>
            <div className="form-control justify-center">
              <div className="justify-center">
                <div className=" p-3">
                  <label htmlFor="brand" className="input-group ">
                    <span>Brand</span>
                    <input
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
                      id="ram"
                      type="number"
                      placeholder="8"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="memory" className="input-group">
                    <span>Memory (Gigabytes)</span>
                    <input
                      id="memory"
                      type="number"
                      placeholder="128"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="price" className="input-group">
                    <span>Price</span>
                    <input
                      id="price"
                      type="number"
                      placeholder="0.03"
                      className="input input-bordered"
                    />
                  </label>
                </div>

                <div className=" p-3">
                  <label htmlFor="salePrice" className="input-group">
                    <span>Sale Price</span>
                    <input
                      id="salePrice"
                      type="number"
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
