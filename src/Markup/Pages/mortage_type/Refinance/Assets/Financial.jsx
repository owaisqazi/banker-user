import React, { useState } from "react";

export const Financial = ({ setFinalInstitute, value, fieldsError }) => {
  console.log(fieldsError, "fieldsError==>");

  const { finalInstitute } = value;
  const { accountNumber } = value;
  const { numberOfShares } = value;
  const [editing, steediting] = useState(true);
  function handleChange(event, state, type) {
    console.log(event.target.value, "event.target.value");

    if (type === "finalInstitute") {
      steediting(false);
    } else {
      steediting(false);
    }
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/[^0-9]/g, "");

    const formattedValue = Number(numericValue).toLocaleString();
    console.log(formattedValue, "formattedValue");
    state({ ...value, [type]: formattedValue });
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mt-3 position-relative">
              <h4
                className="mb-3"
                style={{ fontWeight: "600", fontSize: "20px" }}
              >
                Financial Institution
              </h4>
              <input
                onChange={(e) => {
                  setFinalInstitute((perv) => ({
                    ...perv,
                    finalInstitute: e.target.value,
                  }));
                  handleChange(e, setFinalInstitute, "finalInstitute");
                }}
                placeholder="Required"
                className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                type="text"
                onBlur={() => steediting(true)}
                onFocus={() => steediting(false)}
                value={`${finalInstitute === undefined ? 0 : finalInstitute}${
                  editing === true ? ".00" : ""
                }`}
              />
              {finalInstitute?.length<3 ||
              finalInstitute === undefined ||
              finalInstitute === null ? null : (
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    position: "absolute",
                    right: "3%",
                    top: "47px",
                    color: "green",
                    zIndex: "123",
                  }}
                >
                  ✔
                </p>
              )}
            </div>
            <br />
            <p>
              {fieldsError?.financial_inst?.map((e) => (
                <p className="text-danger">{e}</p>
              ))}
            </p>
            <div className="position-relative">
              <h4
                className="pb-3"
                style={{ fontWeight: "600", fontSize: "20px" }}
              >
                Account Number
              </h4>
              <input
                onChange={(e) => {
                  setFinalInstitute((perv) => ({
                    ...perv,
                    accountNumber: e.target.value,
                  }));
                  handleChange(e, setFinalInstitute, "accountNumber");
                }}
                placeholder="Required"
                className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                type="text"
                onBlur={() => steediting(true)}
                onFocus={() => steediting(false)}
                value={`${accountNumber === undefined ? 0 : accountNumber}${
                  editing === true ? ".00" : ""
                }`}
              />
              {accountNumber?.length<3 ||
              accountNumber === undefined ||
              accountNumber === null ? null : (
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    position: "absolute",
                    right: "3%",
                    top: "55px",
                    color: "green",
                    zIndex: "123",
                  }}
                >
                  ✔
                </p>
              )}
            </div>
            <br />
            <p>
              {fieldsError?.account_number?.map((e) => (
                <p className="text-danger">{e}</p>
              ))}
            </p>
            <div className="mt-3 d-none position-relative">
              <h4
                className="pb-3"
                style={{ fontWeight: "600", fontSize: "20px" }}
              >
                Number of shares
              </h4>
              <input
                type="number"
                className="form-control hinpt rounded-0"
                value={numberOfShares}
                placeholder="Required"
                onChange={(e) =>
                  setFinalInstitute((perv) => ({
                    ...perv,
                    numberOfShares: e.target.value,
                  }))
                }
              />
              {numberOfShares?.length<3 ||
              numberOfShares === undefined ||
              numberOfShares === null ? null : (
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    position: "absolute",
                    right: "3%",
                    top: "55px",
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

export default Financial;
