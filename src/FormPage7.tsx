import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { useState } from "react";
import humanizeString from "./utils/humanizeFieldName";
import { Button } from "./components/button";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage6() {
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page7");

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <div className={withPrefix("mb-4")}>
        <h1 className={withPrefix("py-4 text-2xl")}>
          Summary And Confirmation
        </h1>
        <div className={withPrefix("flex justify-between w-full items-center")}>
          <div>
            <div>
              Occupancy Type: <strong>{formData.occupancy_type}</strong>{" "}
            </div>
            <div>
              Occupancy Date:{" "}
              <strong>
                {formData.occupancy_day}/{formData.occupancy_month}/
                {formData.occupancy_year}
              </strong>
            </div>
          </div>
          <Button color="light" onClick={() => navigate("/?from=page7")}>
            Edit
          </Button>
        </div>
      </div>
      <div className={withPrefix("mb-4")}>
        <h1>Your Service Address</h1>
        <div className={withPrefix("flex justify-between w-full items-center")}>
          <div>
            <div>
              Address: <strong>{formData.selected_address}</strong>{" "}
            </div>
            <div>
              Unit: <strong>{formData.selected_unit}</strong>
            </div>
          </div>
          <Button
            color="light"
            onClick={() => navigate("/form_page2?from=page7")}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className={withPrefix("mb-4")}>
        <h1>Primary Account Holder</h1>
        <div className={withPrefix("flex justify-between w-full items-center")}>
          <div>
            <div>
              First Name: <strong>{formData.first_name}</strong>{" "}
            </div>
            <div>
              Last Name: <strong>{formData.last_name}</strong>{" "}
            </div>
            <div>
              Business Name: <strong>{formData.business_name}</strong>{" "}
            </div>

            <div>
              Email: <strong>{formData.email}</strong>{" "}
            </div>
          </div>

          <Button
            color="light"
            onClick={() => navigate("/form_page3?from=page7")}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className={withPrefix("mb-4")}>
        <h1>Pre-Authorized Payments</h1>
        <div className={withPrefix("flex justify-between w-full items-center")}>
          <div>
            <div>
              Payment Mode:{" "}
              <strong>
                {humanizeString(formData.payment_mode || "Not Selected")}
              </strong>
            </div>

            {formData.payment_mode === "provide_banking_information" && (
              <>
                <div>
                  Branch Transit Number:{" "}
                  <strong>{formData.branch_transit_number}</strong>
                </div>
                <div>
                  Bank Account Number:{" "}
                  <strong>{formData.bank_account_number}</strong>
                </div>
                <div>
                  Financial Institution Number:{" "}
                  <strong>{formData.financial_institution_number}</strong>
                </div>
              </>
            )}
            {formData.payment_mode === "provide_void_cheque" && (
              <div>
                Void Cheque:{" "}
                <img
                  src={formData.void_cheque_image}
                  alt="Void Cheque"
                  className={withPrefix("w-32 h-32")}
                />
              </div>
            )}
          </div>
          <Button
            color="light"
            onClick={() => navigate("/form_page4?from=page7")}
          >
            Edit
          </Button>
        </div>
      </div>
      <div>
        <h1>Terms and Conditions</h1>
        <div className={withPrefix("flex justify-between w-full items-center")}>
          <div>
            <div>
              Accept Terms and Conditions:{" "}
              <strong>
                {formData.accept_terms_and_conditions ? "Yes" : "No"}
              </strong>
            </div>
          </div>
          <Button color="light" onClick={() => navigate("/form_page6")}>
            Edit
          </Button>
        </div>
      </div>

      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage show={showValidationError} id="/page7" />
        <FooterWrapper>
          <NavButton
            label="Save and Continue"
            action={() => {
              if (pageIsValid) {
                navigate("/form_page8");
              } else {
                setShowValidationError(true);
              }
            }}
            currentPage="page7"
          />
        </FooterWrapper>
      </div>
    </div>
  );
}

export default FormPage6;
