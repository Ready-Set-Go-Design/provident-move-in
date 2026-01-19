import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";
import { Input } from "./components/input";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { useState } from "react";
import { validateForm } from "./utils/validateForm";
import { Field, Label } from "./components/fieldset";
import { WrappedInput } from "./components/WrappedInput";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page3");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page3",
  );
  console.log("hi");
  console.log(validatedForm?.errors.includes("First Name"));

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>Primary Account Holder</h1>
      <Field className={withPrefix("mb-4")}>
        <Label>First Name</Label>
        <WrappedInput
          showSearch={false}
          invalid={
            showValidationError && validatedForm?.errors.includes("First Name")
          }
          type="text"
          name="first_name"
          placeholder={""}
          value={formData.first_name}
          onChange={(e: any) => {
            dispatch(
              updateField({
                field: "first_name",
                value: e,
              }),
            );
          }}
          clearAction={(e: any) => {
            dispatch(updateField({ field: "first_name", value: "" }));
          }}
        />
      </Field>
      <Field className={withPrefix("mb-4")}>
        <Label>Last Name</Label>

        <WrappedInput
          showSearch={false}
          invalid={
            showValidationError && validatedForm?.errors.includes("Last Name")
          }
          type="text"
          name="last_name"
          placeholder={""}
          value={formData.last_name}
          onChange={(e: any) => {
            dispatch(
              updateField({
                field: "last_name",
                value: e,
              }),
            );
          }}
          clearAction={(e: any) => {
            dispatch(updateField({ field: "last_name", value: "" }));
          }}
        />
      </Field>

      {formData.occupancy_type.toLowerCase() !== "tenant" && (
        <Field className={withPrefix("mb-4")}>
          <Label>Business Name</Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("Business Name")
            }
            type="text"
            name="business_name"
            placeholder={""}
            value={formData.business_name}
            onChange={(e: any) => {
              dispatch(
                updateField({
                  field: "last_name",
                  value: e,
                }),
              );
            }}
            clearAction={(e: any) => {
              dispatch(updateField({ field: "last_name", value: "" }));
            }}
          />
        </Field>
      )}
      <Field className={withPrefix("mb-4")}>
        <Label>Email Address</Label>

        <WrappedInput
          showSearch={false}
          invalid={
            showValidationError && validatedForm?.errors.includes("Email")
          }
          type="email"
          name="email"
          placeholder={""}
          value={formData.email}
          onChange={(e: any) => {
            dispatch(
              updateField({
                field: "email",
                value: e,
              }),
            );
          }}
          clearAction={(e: any) => {
            dispatch(updateField({ field: "email", value: "" }));
          }}
        />
      </Field>
      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage show={showValidationError} id="/page3" />
        <FooterWrapper>
          <NavButton
            label="Save and Continue"
            action={() => {
              if (pageIsValid) {
                navigate(from ? `/form_${from}` : "/form_page4");
              } else {
                setShowValidationError(true);
              }
            }}
            currentPage="page3"
            disabledButClickable={!validatedForm.valid}
          />
        </FooterWrapper>
      </div>
    </div>
  );
}

export default FormPage3;
