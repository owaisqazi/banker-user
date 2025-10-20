import React from "react";
import buy from "../../../../Images/buy-icon.png";
import { Link } from "react-router-dom";
import Header from "../../../Layout/Header";
import Logout from "../../../Layout/Logout";
import Footer from "../../../Layout/Footer";

const SelectTypeReinence = () => {
  return (
    <>
      <Header />
      <section className="bor_types d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row mt-3 py-4">
            <div className="card custom_card mt-3 mb-4 mt-lg-5 w-90 mx-auto align-items-center px-5">
              <h3
                style={{ fontSize: "24px", fontWeight: "500" }}
                className="text-center my-4 text-dark"
              >
                Please Select your Option
              </h3>
              <div className="row  justify-content-center">
                <div className="col-md-3 my-3 mt-md-0">
                  <Link to={"/ref/mortageinfo"}>
                    <div className="card cardes py-4">
                      <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <img
                          src={buy}
                          alt=""
                          width={"35%"}
                          // height={"100%"}
                          className="text-center "
                        />
                        <h6 className="text-black">Buy</h6>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3 my-3 mt-md-0">
                  <Link to={"/ref/mortageinfo"}>
                    <div
                      style={{ width: "100%", height: "100%" }}
                      className="card cardes py-4"
                    >
                      <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <img
                          src={buy}
                          alt=""
                          width={"35%"}
                          // height={"100%"}
                          className="text-center "
                        />
                        <h6 className="text-black">Sell</h6>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-md-3 my-3 mt-md-0">
                  <Link to={"/ref/mortageinfo"}>
                    <div
                      style={{ width: "100%", height: "100%" }}
                      className="card cardes py-4"
                    >
                      <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <img
                          src={buy}
                          alt=""
                          width={"35%"}
                          // height={"100%"}
                          className="text-center "
                        />
                        <h6 className="text-black">Rent</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-5">
                  <div className="text-center">
                    <Logout classes="btn btn-outline-primary fw-bolder" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SelectTypeReinence;
