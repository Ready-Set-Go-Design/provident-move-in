import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { useEffect, useState } from "react";
import { validateForm } from "./utils/validateForm";
import { Field, Label } from "./components/fieldset";
import { WrappedInput } from "./components/WrappedInput";
import { FooterWrapper } from "./components/FooterWrapper";
import { Switch } from "@headlessui/react";

function FormPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const [announceKey, setAnnounceKey] = useState<number>(0);
  const pageIsValid = isPageValid("/page3");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page3",
  );

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  const toggleSecondaryHolder = () => {
    if (formData.has_secondary_occupant === "true") {
      // Clear secondary occupant fields when toggling off
      dispatch(updateField({ field: "secondary_first_name", value: "" }));
      dispatch(updateField({ field: "secondary_last_name", value: "" }));
      dispatch(updateField({ field: "secondary_email", value: "" }));
      dispatch(updateField({ field: "secondary_phone_number", value: "" }));
    }
    dispatch(
      updateField({
        field: "has_secondary_occupant",
        value: formData.has_secondary_occupant === "true" ? "false" : "true",
      }),
    );
  };

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h2 className={withPrefix("py-4 text-2xl")}>Primary Account Holder</h2>
      <main>
        <Field className={withPrefix("mb-4")}>
          <Label className={withPrefix("font-bold")}>First Name</Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("First Name")
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
          <Label className={withPrefix("font-bold")}>Last Name</Label>

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

        {/* {formData.occupancy_type.toLowerCase() !== "tenant" && ( */}
        <Field className={withPrefix("mb-4")}>
          <Label className={withPrefix("font-bold")}>
            Business Name
            <br />
            <div
              className={withPrefix("font-normal text-gray-500 mb-1 text-sm")}
            >
              If you wish this account be under a business enter the name below
            </div>
          </Label>
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
                  field: "business_name",
                  value: e,
                }),
              );
            }}
            clearAction={(e: any) => {
              dispatch(updateField({ field: "business_name", value: "" }));
            }}
          />
        </Field>
        {/* )} */}
        <Field className={withPrefix("mb-4")}>
          <Label className={withPrefix("font-bold")}>Email Address</Label>

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
        <Field className={withPrefix("mb-4")}>
          <Label className={withPrefix("font-bold")}>Phone Number</Label>

          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("Phone Number")
            }
            type="text"
            name="phone_number"
            placeholder={""}
            value={formData.phone_number}
            onChange={(e: any) => {
              dispatch(
                updateField({
                  field: "phone_number",
                  value: e,
                }),
              );
            }}
            clearAction={(e: any) => {
              dispatch(updateField({ field: "phone_number", value: "" }));
            }}
          />
        </Field>

        <div className={withPrefix("font-bold mt-4 mb-2")}>
          Add Secondary Account Holder?
        </div>

        <Switch
          checked={formData.has_secondary_occupant === "true"}
          aria-label="Add Secondary Account Holder?"
          onChange={toggleSecondaryHolder}
          className={withPrefix(
            `group cursor-pointer inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-(--primary-color) mb-4`,
          )}
        >
          <span
            className={withPrefix(
              "size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6",
            )}
          />
        </Switch>

        {formData.has_secondary_occupant === "true" && (
          <>
            <h2 className={withPrefix("py-4 text-2xl")}>
              Secondary Account Holder
            </h2>
            <Field className={withPrefix("mb-4")}>
              <Label className={withPrefix("font-bold")}>First Name</Label>
              <WrappedInput
                showSearch={false}
                invalid={
                  showValidationError &&
                  validatedForm?.errors.includes("Secondary First Name")
                }
                type="text"
                name="secondary_first_name"
                placeholder={""}
                value={formData.secondary_first_name}
                onChange={(e: any) => {
                  dispatch(
                    updateField({
                      field: "secondary_first_name",
                      value: e,
                    }),
                  );
                }}
                clearAction={(e: any) => {
                  dispatch(
                    updateField({ field: "secondary_first_name", value: "" }),
                  );
                }}
              />
            </Field>
            <Field className={withPrefix("mb-4")}>
              <Label className={withPrefix("font-bold")}>Last Name</Label>

              <WrappedInput
                showSearch={false}
                invalid={
                  showValidationError &&
                  validatedForm?.errors.includes("Secondary Last Name")
                }
                type="text"
                name="secondary_last_name"
                placeholder={""}
                value={formData.secondary_last_name}
                onChange={(e: any) => {
                  dispatch(
                    updateField({
                      field: "secondary_last_name",
                      value: e,
                    }),
                  );
                }}
                clearAction={(e: any) => {
                  dispatch(
                    updateField({ field: "secondary_last_name", value: "" }),
                  );
                }}
              />
            </Field>
            <Field className={withPrefix("mb-4")}>
              <Label className={withPrefix("font-bold")}>Email Address</Label>

              <WrappedInput
                showSearch={false}
                invalid={
                  showValidationError &&
                  validatedForm?.errors.includes("Secondary Email")
                }
                type="email"
                name="secondary_email"
                placeholder={""}
                value={formData.secondary_email}
                onChange={(e: any) => {
                  dispatch(
                    updateField({
                      field: "secondary_email",
                      value: e,
                    }),
                  );
                }}
                clearAction={(e: any) => {
                  dispatch(
                    updateField({ field: "secondary_email", value: "" }),
                  );
                }}
              />
            </Field>
            <Field className={withPrefix("mb-4")}>
              <Label className={withPrefix("font-bold")}>Phone Number</Label>

              <WrappedInput
                showSearch={false}
                invalid={
                  showValidationError &&
                  validatedForm?.errors.includes("Secondary Phone Number")
                }
                type="text"
                name="secondary_phone_number"
                placeholder={""}
                value={formData.secondary_phone_number}
                onChange={(e: any) => {
                  dispatch(
                    updateField({
                      field: "secondary_phone_number",
                      value: e,
                    }),
                  );
                }}
                clearAction={(e: any) => {
                  dispatch(
                    updateField({ field: "secondary_phone_number", value: "" }),
                  );
                }}
              />
            </Field>
          </>
        )}
      </main>

      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage
          show={showValidationError}
          id="/page3"
          announceKey={announceKey}
        />
        <FooterWrapper>
          <NavButton
            label="Save and Continue"
            action={() => {
              if (pageIsValid) {
                navigate(from ? `/form_${from}` : "/form_page4");
              } else {
                setShowValidationError(true);
                setAnnounceKey((current) => current + 1);
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
