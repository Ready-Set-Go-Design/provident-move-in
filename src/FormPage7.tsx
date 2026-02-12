import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { useState } from "react";

import { Button } from "./components/button";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage7() {
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const [announceKey, setAnnounceKey] = useState<number>(0);
  const pageIsValid = isPageValid("/page7");

  const friendlyDate = new Date(
    `${formData.occupancy_year}-${formData.occupancy_month}-${formData.occupancy_day}`,
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h2 className={withPrefix("py-4 text-2xl font-bold")}>
        Summary And Confirmation
      </h2>
      <main>
        <div className={withPrefix("mb-4")}>
          <div>
            <div
              className={withPrefix(
                "grid grid-cols-[2fr_3fr] gap-2 text-sm mb-2",
              )}
            >
              <div className={withPrefix("text-gray-600")}>Occupancy Type:</div>

              <div className={withPrefix("font-bold")}>
                {formData.occupancy_type
                  .replace("_", " ")
                  .toLowerCase()
                  .at(0)
                  ?.toUpperCase() +
                  formData.occupancy_type
                    .replace("_", " ")
                    .toLowerCase()
                    .slice(1)}
              </div>

              <div className={withPrefix("text-gray-600")}>Occupancy Date:</div>
              <div className={withPrefix("font-bold")}>{friendlyDate}</div>
            </div>
            <Button
              color="light"
              onClick={() => navigate("/?from=page7")}
              aria-label="Edit Occupancy Details"
            >
              Edit
            </Button>
          </div>
        </div>
        <div className={withPrefix("mb-4")}>
          <h3 className={withPrefix("font-bold mb-2")}>Your Service Address</h3>
          <div>
            <div
              className={withPrefix(
                "grid grid-cols-[2fr_3fr] gap-2 text-sm mb-2",
              )}
            >
              <div className={withPrefix("text-gray-600")}>
                Service Address:
              </div>
              <div className={withPrefix("font-bold")}>
                <div>
                  {formData.selected_unit} - {formData.selected_address}
                </div>
                <div>{formData.city}</div>
                <div>{formData.postal_code}</div>
              </div>
            </div>
            <Button
              color="light"
              onClick={() => navigate("/form_page2?from=page7")}
              aria-label="Edit Service Address Details"
            >
              Edit
            </Button>
          </div>
        </div>

        <div className={withPrefix("mb-4")}>
          <h3 className={withPrefix("font-bold mb-2")}>Contact Details</h3>
          <div>
            <div>
              <div
                className={withPrefix(
                  "grid grid-cols-[2fr_3fr] gap-2 text-sm mb-2",
                )}
              >
                <div className={withPrefix("text-gray-600")}>First Name:</div>
                <div className={withPrefix("font-bold")}>
                  {formData.first_name}
                </div>
                <div className={withPrefix("text-gray-600")}>Last Name:</div>
                <div className={withPrefix("font-bold")}>
                  {formData.last_name}
                </div>
                <div className={withPrefix("text-gray-600")}>
                  Business Name:
                </div>
                <div className={withPrefix("font-bold")}>
                  {formData.business_name || (
                    <span className={withPrefix("text-gray-300")}>N/A</span>
                  )}
                </div>
                <div className={withPrefix("text-gray-600")}>Email:</div>
                <div className={withPrefix("font-bold")}>{formData.email}</div>
                <div className={withPrefix("text-gray-600")}>Phone Number:</div>
                <div className={withPrefix("font-bold")}>
                  {formData.phone_number}
                </div>
              </div>
              {formData.has_secondary_occupant === "true" && (
                <>
                  <h3 className={withPrefix("font-bold mb-2 mt-4")}>
                    Secondary Contact Details
                  </h3>
                  <div
                    className={withPrefix(
                      "grid grid-cols-[2fr_3fr] gap-2 text-sm mb-2",
                    )}
                  >
                    <div className={withPrefix("text-gray-600")}>
                      First Name:
                    </div>
                    <div className={withPrefix("font-bold")}>
                      {formData.secondary_first_name}
                    </div>
                    <div className={withPrefix("text-gray-600")}>
                      Last Name:
                    </div>
                    <div className={withPrefix("font-bold")}>
                      {formData.secondary_last_name}
                    </div>

                    <div className={withPrefix("text-gray-600")}>Email:</div>
                    <div className={withPrefix("font-bold")}>
                      {formData.secondary_email}
                    </div>
                    <div className={withPrefix("text-gray-600")}>
                      Phone Number:
                    </div>
                    <div className={withPrefix("font-bold")}>
                      {formData.secondary_phone_number}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button
              color="light"
              onClick={() => navigate("/form_page3?from=page7")}
              aria-label="Edit Contact Details"
            >
              Edit
            </Button>
          </div>
        </div>

        <div className={withPrefix("mb-4")}>
          <h3 className={withPrefix("font-bold mb-2")}>
            Pre-auth payment info
          </h3>
          <div>
            <div>
              {formData.payment_mode === "provide_void_cheque" && (
                <div
                  className={withPrefix(
                    "border-2 border-gray-300 rounded-xl p-2 pf:bg-gray-100",
                  )}
                >
                  <img
                    src={formData.void_cheque_image}
                    alt="Void Cheque"
                    className={withPrefix("w-full h-auto")}
                  />
                </div>
              )}

              {formData.payment_mode === "provide_banking_information" && (
                <div
                  className={withPrefix(
                    "grid grid-cols-[2fr_3fr] gap-2 text-sm mb-2",
                  )}
                >
                  <div className={withPrefix("text-gray-600")}>
                    Transit Number:
                  </div>
                  <div className={withPrefix("font-bold")}>
                    {formData.branch_transit_number}
                  </div>
                  <div className={withPrefix("text-gray-600")}>
                    Institution Number:
                  </div>
                  <div className={withPrefix("font-bold")}>
                    {formData.financial_institution_number}
                  </div>
                  <div className={withPrefix("text-gray-600")}>
                    Account Number:
                  </div>
                  <div className={withPrefix("font-bold")}>
                    {formData.bank_account_number}
                  </div>
                </div>
              )}
            </div>
            <Button
              color="light"
              onClick={() => navigate("/form_page4?from=page7")}
              aria-label="Edit Payment Information"
            >
              Edit
            </Button>
          </div>
        </div>
        <div>
          <h3 className={withPrefix("font-bold mb-2")}>Terms and Conditions</h3>
          <div>
            <div
              className={withPrefix(
                "grid grid-cols-[2fr_3fr] gap-2 text-sm mb-2",
              )}
            >
              <div>Accept Terms and Conditions:</div>
              <div className={withPrefix("font-bold")}>
                {formData.accept_terms_and_conditions ? "Yes" : "No"}
              </div>
            </div>
            <Button
              color="light"
              onClick={() => navigate("/form_page6")}
              aria-label="Edit Terms and Conditions"
            >
              Edit
            </Button>
          </div>
        </div>
      </main>
      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage
          show={showValidationError}
          id="/page7"
          announceKey={announceKey}
        />
        <FooterWrapper>
          <NavButton
            label="Save and Continue"
            action={() => {
              if (pageIsValid) {
                navigate("/form_page8");
              } else {
                setShowValidationError(true);
                setAnnounceKey((current) => current + 1);
              }
            }}
            currentPage="page7"
          />
        </FooterWrapper>
      </div>
    </div>
  );
}

export default FormPage7;
