import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Radio, RadioField } from "./components/radio";
import { Description, Label } from "./components/fieldset";
import { withPrefix } from "./utils/withPrefix";
import { CheckboxField } from "./components/checkbox";
import { FormCheckbox, FormRadioGroup } from "./components/formControls";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { validateForm } from "./utils/validateForm";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const [announceKey, setAnnounceKey] = useState<number>(0);
  const pageIsValid = isPageValid("/page4");
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page4",
  );

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h2 className={withPrefix("py-4 text-2xl")}>Pre-Authorized Payments</h2>
      <main>
        <div>
          <FormRadioGroup
            className={withPrefix(
              "border-1 rounded-md pf:overflow-hidden p-2 pt-0",
              showValidationError && formData.payment_mode === ""
                ? "border-(--validation-error-color)"
                : "border-transparent",
            )}
            name="payment_mode"
            label="Payment mode"
            defaultValue="provide_banking_information"
            value={formData.payment_mode}
            onChange={(e) => {
              if (e === "provide_void_cheque") {
                dispatch(
                  updateField({ field: "branch_transit_number", value: "" }),
                );
                dispatch(
                  updateField({
                    field: "financial_institution_number",
                    value: "",
                  }),
                );
                dispatch(updateField({ field: "account_number", value: "" }));
              } else {
                dispatch(
                  updateField({ field: "void_cheque_image", value: "" }),
                );
              }
              dispatch(
                updateField({
                  field: "payment_mode",
                  value: e,
                }),
              );
            }}
          >
            <RadioField>
              <Radio value="provide_banking_information" color="green" />
              <Label className={withPrefix("!font-bold")}>
                Provide banking information
              </Label>
              <Description className={withPrefix("text-gray-600")}>
                Customers can provide their banking information for payments.
              </Description>
            </RadioField>
            <RadioField>
              <Radio value="provide_void_cheque" color="green" />
              <Label className={withPrefix("!font-bold")}>
                Provide a void cheque
              </Label>
              <Description className={withPrefix("text-gray-600")}>
                Customers can provide a void cheque for payments.
              </Description>
            </RadioField>
          </FormRadioGroup>
        </div>

        <CheckboxField
          className={withPrefix(
            "border-1 rounded-md pf:overflow-hidden p-2 mt-4",
            showValidationError &&
              formData.accept_preauth_terms_and_conditions === ""
              ? "border-(--validation-error-color)"
              : "border-transparent",
          )}
        >
          <FormCheckbox
            color="green"
            value={formData.accept_preauth_terms_and_conditions}
            name="accept_preauth_terms_and_conditions"
            checked={formData.accept_preauth_terms_and_conditions === "true"}
            onChange={(checked) => {
              dispatch(
                updateField({
                  field: "accept_preauth_terms_and_conditions",
                  value: checked ? "true" : "",
                }),
              );
            }}
          />
          <Label className={withPrefix("font-bold")}>
            I accept the terms and conditions of pre-auth payments
          </Label>
        </CheckboxField>
      </main>

      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage
          show={showValidationError}
          id="/page4"
          announceKey={announceKey}
        />
        <FooterWrapper>
          <NavButton
            outline={true}
            action={() => {
              dispatch(
                updateField({
                  field: "accept_preauth_terms_and_conditions",
                  value: "",
                }),
              );
              dispatch(
                updateField({
                  field: "payment_mode",
                  value: "",
                }),
              );
              navigate(from ? `/form_${from}` : "/form_page6");
            }}
            label={"Skip this step"}
          />
          <NavButton
            action={() => {
              if (pageIsValid) {
                navigate(from ? `/form_page5?from=${from}` : "/form_page5");
              } else {
                setShowValidationError(true);
                setAnnounceKey((current) => current + 1);
              }
            }}
            label={"Save and Continue"}
            currentPage="page4"
            disabledButClickable={!validatedForm.valid}
          />
        </FooterWrapper>
      </div>
    </div>
  );
}

export default FormPage4;
