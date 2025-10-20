import React from "react";

export const Funds = ({ setFinalInstitute, value }) => {
  const { fundStoreType } = value;
  const { depositedOrNonDeposited } = value;
  const { fundStoreDescription } = value;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mt-3 position-relative">
              <h4>Funds Source Type</h4>
              <select
                className={`form-control text-capitalize rounded-0 hinpt mt-4 ${
                  fundStoreType.length < 3 ||
                  fundStoreType === undefined ||
                  fundStoreType === null
                ?"text-dark":"text-success"}`}
                value={fundStoreType}
                onChange={(e) =>
                  setFinalInstitute((perv) => ({
                    ...perv,
                    fundStoreType: e.target.value,
                  }))
                }
              >
                <option id="">- Funds Source Type -</option>
                <option value="Community Non Profit">
                  Community Non Profit
                {fundStoreType === "Community Non Profit" && <span>✔</span>}</option>
                <option value="Employer"> Employer{fundStoreType === "Employer" && <span>✔</span>}</option>
                <option value="Federal Agency"> Federal Agency{fundStoreType === "Federal Agency" && <span>✔</span>}</option>
                <option value="Local Agency"> Local Agency{fundStoreType === "Local Agency" && <span>✔</span>}</option>
                <option value="Non Parent Relative">Non Parent Relative{fundStoreType === "Non Parent Relative" && <span>✔</span>}</option>
                <option value="Parent"> Parent{fundStoreType === "Parent" && <span>✔</span>}</option>
                <option value="Relative"> Relative{fundStoreType === "Relative" && <span>✔</span>}</option>
                <option value="Religious Non Profit">
                  Religious Non Profit
                {fundStoreType === "Religious Non Profit" && <span>✔</span>}</option>
                <option value="State Agency"> State Agency{fundStoreType === "State Agency" && <span>✔</span>}</option>
                <option value="Unmarried Partner"> Unmarried Partner{fundStoreType === "Unmarried Partner" && <span>✔</span>}</option>
                Other
                <option value="Unrelated Friend"> Unrelated Friend{fundStoreType === "Unrelated Friend" && <span>✔</span>}</option>
                <option value="Lender"> Lender{fundStoreType === "Lender" && <span>✔</span>}</option>
              </select>
            </div>

            <div className="mt-3 position-relative">
              <h4>Funds Source Description</h4>
              <input
                type="text"
                className="form-control text-capitalize rounded-0 hinpt mt-4"
                placeholder="Optional"
                value={fundStoreDescription}
                onChange={(e) =>
                  setFinalInstitute((perv) => ({
                    ...perv,
                    fundStoreDescription: e.target.value,
                  }))
                }
              />
              {fundStoreDescription.length < 3 ||
              fundStoreDescription === undefined ||
              fundStoreDescription === null ? null : (
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    position: "absolute",
                    right: "3%",
                    top: "62px",
                    color: "green",
                    zIndex: "123",
                  }}
                >
                  ✔
                </p>
              )}
            </div>

            <div className="mt-3 position-relative">
              <h4>Deposited/Non-Deposited</h4>
              <input
                type="text"
                className="form-control text-capitalize rounded-0 hinpt mt-4"
                placeholder="Non-Deposited"
                value={depositedOrNonDeposited}
                onChange={(e) =>
                  setFinalInstitute((perv) => ({
                    ...perv,
                    depositedOrNonDeposited: e.target.value,
                  }))
                }
              />
              {depositedOrNonDeposited.length < 3 ||
              depositedOrNonDeposited === undefined ||
              depositedOrNonDeposited === null ? null : (
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    position: "absolute",
                    right: "3%",
                    top: "60px",
                    color: "green",
                    zIndex: "123",
                  }}
                >
                  ✔
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
