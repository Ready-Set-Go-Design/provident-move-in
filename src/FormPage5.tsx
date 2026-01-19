import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { useState } from "react";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { Input } from "./components/input";
import { validateForm } from "./utils/validateForm";
import { Field, Label } from "./components/fieldset";
import { Button } from "./components/button";
import { FooterWrapper } from "./components/FooterWrapper";
import { WrappedInput } from "./components/WrappedInput";

function FormPage5() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [voidChequeImageError, setVoidChequeImageError] =
    useState<boolean>(false);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page5");
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page5",
  );

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      {formData.payment_mode === "" && (
        <div className={withPrefix("mb-4")}>
          <h1 className={withPrefix("py-4 text-2xl")}>Payment Mode Required</h1>

          <NavButton
            outline={true}
            action={() => navigate("/form_page4")}
            label="Select Payment Mode"
            fullWidth="false"
          />
        </div>
      )}
      {formData.payment_mode === "provide_banking_information" && (
        <div>
          <h1 className={withPrefix("py-4 text-2xl")}>
            Provide Banking Information
          </h1>

          <Field className={withPrefix("mb-4")}>
            <Label className={withPrefix("font-bold")}>
              Branch Transit Number
            </Label>
            <WrappedInput
              showSearch={false}
              invalid={
                showValidationError &&
                validatedForm?.errors.includes("Branch Transit Number")
              }
              type="number"
              name="branch_transit_number"
              placeholder={"5-digit Branch Transit Number"}
              value={formData.branch_transit_number}
              onChange={(e: any) => {
                if (e.length <= 5)
                  dispatch(
                    updateField({
                      field: "branch_transit_number",
                      value: e,
                    }),
                  );
              }}
              clearAction={(e: any) => {
                dispatch(
                  updateField({ field: "branch_transit_number", value: "" }),
                );
              }}
            />
          </Field>
          <Field className={withPrefix("mb-4")}>
            <Label>Financial Institution Number</Label>
            <WrappedInput
              showSearch={false}
              invalid={
                showValidationError &&
                validatedForm?.errors.includes("Financial Institution Number")
              }
              type="number"
              name="financial_institution_number"
              placeholder={"3-digit Financial Institution Number"}
              value={formData.financial_institution_number}
              onChange={(e: any) => {
                if (e.length <= 3)
                  dispatch(
                    updateField({
                      field: "financial_institution_number",
                      value: e,
                    }),
                  );
              }}
              clearAction={(e: any) => {
                dispatch(
                  updateField({
                    field: "financial_institution_number",
                    value: "",
                  }),
                );
              }}
            />
          </Field>
          <Field className={withPrefix("mb-4")}>
            <Label className={withPrefix("font-bold")}>
              Bank Account Number
            </Label>
            <WrappedInput
              showSearch={false}
              invalid={
                showValidationError &&
                validatedForm?.errors.includes("Bank Account Number")
              }
              type="number"
              name="bank_account_number"
              placeholder={"7-digit Bank Account Number"}
              value={formData.bank_account_number}
              onChange={(e: any) => {
                if (e.length <= 7)
                  dispatch(
                    updateField({
                      field: "bank_account_number",
                      value: e,
                    }),
                  );
              }}
              clearAction={(e: any) => {
                dispatch(
                  updateField({ field: "bank_account_number", value: "" }),
                );
              }}
            />
          </Field>
        </div>
      )}

      {formData.payment_mode === "provide_void_cheque" && (
        <div>
          <h1 className={withPrefix("py-4 text-2xl")}>Upload a Void Cheque</h1>
          <Input
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("Provide Void Cheque")
            }
            type="file"
            className={withPrefix("hidden")}
            name="void_cheque"
            placeholder="Upload your void cheque"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) {
                setVoidChequeImageError(true);
                return;
              }
              if (file.type !== "image/jpeg" && file.type !== "image/png") {
                setVoidChequeImageError(true);
                return;
              }
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  if (reader.result) {
                    const imageData = reader.result.toString();
                    if (!imageData || file.size > 1500000) {
                      if (file.size > 1500000) {
                        const img = new Image();
                        img.onload = () => {
                          const canvas = document.createElement("canvas");
                          const ctx = canvas.getContext("2d");
                          if (!ctx) return;

                          const scaleFactor = Math.sqrt(1500000 / file.size);
                          canvas.width = img.width * scaleFactor;
                          canvas.height = img.height * scaleFactor;

                          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                          canvas.toBlob(
                            (blob) => {
                              if (blob && blob.size <= 1500000) {
                                const resizedReader = new FileReader();
                                resizedReader.onloadend = () => {
                                  if (resizedReader.result) {
                                    console.log("trying to dispatch 1");
                                    console.log(
                                      resizedReader.result.toString(),
                                    );
                                    dispatch(
                                      updateField({
                                        field: "void_cheque_image",
                                        value: resizedReader.result.toString(),
                                      }),
                                    );
                                    setVoidChequeImageError(false);
                                  } else {
                                    console.log("failing");
                                  }
                                };
                                resizedReader.readAsDataURL(blob);
                              } else {
                                setVoidChequeImageError(true);
                              }
                            },
                            "image/jpeg",
                            0.9,
                          );
                        };
                        img.src = imageData;
                      } else {
                        setVoidChequeImageError(true);
                      }
                    } else {
                      console.log("trying to dispatch");
                      dispatch(
                        updateField({
                          field: "void_cheque_image",
                          value: imageData,
                        }),
                      );
                      setVoidChequeImageError(false);
                    }
                  }
                };
                reader.readAsDataURL(file);
              }

              // load image data from this file
            }}
          />
          <div className={withPrefix("mb-4")}>
            {voidChequeImageError && (
              <div className={withPrefix("text-red-500")}>
                Please upload a valid image file (JPEG or PNG).
              </div>
            )}
          </div>
          {formData.void_cheque_image && formData.void_cheque_image > "" && (
            <div>
              <div className={withPrefix("max-w-full h-auto")}>
                <img
                  className={withPrefix("object-contain")}
                  src={formData.void_cheque_image}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <AllFieldsRequiredMessage show={showValidationError} id="/page5" />
      <FooterWrapper>
        {formData.payment_mode === "provide_void_cheque" &&
          formData.void_cheque_image === "" && (
            <Button
              outline={true}
              className={withPrefix(
                `w-full !rounded-full !font-normal !text-sm`,
              )}
              onClick={() => {
                const fileInput = document.querySelector(
                  'input[name="void_cheque"]',
                ) as HTMLInputElement;
                fileInput.click();
              }}
            >
              Select Image
            </Button>
          )}
        {formData.payment_mode === "provide_void_cheque" &&
          formData.void_cheque_image > "" && (
            <Button
              outline={true}
              className={withPrefix(
                `w-full !rounded-full !font-normal !text-sm`,
              )}
              onClick={() => {
                dispatch(
                  updateField({
                    field: "void_cheque_image",
                    value: "",
                  }),
                );
                const fileInput = document.querySelector(
                  'input[name="void_cheque"]',
                ) as HTMLInputElement;
                fileInput.click();
              }}
            >
              Replace Image
            </Button>
          )}
        <NavButton
          action={() => {
            console.log(formData.payment_mode);
            if (pageIsValid) {
              if (formData.payment_mode === "provide_banking_information") {
                dispatch(
                  updateField({
                    field: "void_cheque_image",
                    value: "",
                  }),
                );
              } else if (formData.payment_mode === "provide_void_cheque") {
                console.log("clearing");
                dispatch(
                  updateField({
                    field: "branch_transit_number",
                    value: "",
                  }),
                );
                dispatch(
                  updateField({
                    field: "bank_account_number",
                    value: "",
                  }),
                );
                dispatch(
                  updateField({
                    field: "financial_institution_number",
                    value: "",
                  }),
                );
              }
              navigate(from ? `/form_${from}` : "/form_page6");
            } else {
              setShowValidationError(true);
            }
          }}
          label={"Save and Continue"}
          currentPage="page5"
          disabledButClickable={!pageIsValid}
        />
      </FooterWrapper>
    </div>
  );
}

export default FormPage5;
