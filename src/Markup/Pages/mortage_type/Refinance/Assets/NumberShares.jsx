import React, { useState } from "react";

export const NumberShares = ({ setFinalInstitute, value, fieldsError }) => {
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
            <div className="mt-3">
              <h4
                className="pb-3"
                style={{ fontWeight: "600", fontSize: "20px" }}
              >
                Number of shares
              </h4>
              <input
                onChange={(e) => {
                  setFinalInstitute((perv) => ({
                    ...perv,
                    numberOfShares: e.target.value,
                  }));
                  handleChange(e, setFinalInstitute, "numberOfShares");
                }}
                placeholder="Required"
                className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                type="text"
                onBlur={() => steediting(true)}
                onFocus={() => steediting(false)}
                value={`${numberOfShares === undefined ? 0 : numberOfShares}${
                  editing === true ? ".00" : ""
                }`}
              />
              {numberOfShares.length<3 ||
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
            <br />
            <p>
              {fieldsError?.no_of_shares?.map((e) => (
                <p className="text-danger">{e}</p>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberShares;
