import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import SignatureCanvas from "react-signature-canvas";
import { useEffect, useRef, useState } from "react";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { useMeasure } from "react-use";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { CheckboxField } from "./components/checkbox";
import { FormCheckbox } from "./components/formControls";
import { WrappedInput } from "./components/WrappedInput";
import { Button } from "./components/button";
import { FooterWrapper } from "./components/FooterWrapper";
import { Label } from "./components/fieldset";

function FormPage8() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const sigCanvas2 = useRef<SignatureCanvas | null>(null);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const [announceKey, setAnnounceKey] = useState<number>(0);
  const [signatureMethod, setSignatureMethod] = useState<"draw" | "type">(
    formData.signature_method === "draw" || formData.signature_method === "type"
      ? formData.signature_method
      : formData.signature_text
        ? "type"
        : "draw",
  );
  const [secondarySignatureMethod, setSecondarySignatureMethod] = useState<
    "draw" | "type"
  >(
    formData.secondary_signature_method === "draw" ||
      formData.secondary_signature_method === "type"
      ? formData.secondary_signature_method
      : formData.secondary_signature_text
        ? "type"
        : "draw",
  );
  const pageIsValid = isPageValid("/page8");

  useEffect(() => {
    if (!formData.signature_method) {
      dispatch(
        updateField({ field: "signature_method", value: signatureMethod }),
      );
    }
  }, [dispatch, formData.signature_method, signatureMethod]);

  useEffect(() => {
    if (!formData.secondary_signature_method) {
      dispatch(
        updateField({
          field: "secondary_signature_method",
          value: secondarySignatureMethod,
        }),
      );
    }
  }, [dispatch, formData.secondary_signature_method, secondarySignatureMethod]);

  const clearForm = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      dispatch(updateField({ field: "signature_image", value: "" }));
    }
  };
  const clearForm2 = () => {
    if (sigCanvas2.current) {
      sigCanvas2.current.clear();
      dispatch(updateField({ field: "secondary_signature_image", value: "" }));
    }
  };

  const [containerRef, { width, height }] = useMeasure();

  const redrawSignature = () => {
    if (formData.signature_image && sigCanvas.current) {
      sigCanvas.current.clear();
      const img = new window.Image();
      img.addEventListener("load", function () {
        sigCanvas.current?.getCanvas().getContext("2d")?.drawImage(img, 0, 0);
      });
      img.setAttribute("src", formData.signature_image);
    }
    if (formData.secondary_signature_image && sigCanvas2.current) {
      sigCanvas2.current.clear();
      const img = new window.Image();
      img.addEventListener("load", function () {
        sigCanvas2.current?.getCanvas().getContext("2d")?.drawImage(img, 0, 0);
      });
      img.setAttribute("src", formData.secondary_signature_image);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setTimeout(redrawSignature, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [formData.signature_image, formData.secondary_signature_image]);

  useEffect(() => {
    const timeoutId = setTimeout(redrawSignature, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h2 className={withPrefix("py-4 text-2xl")}>Signature</h2>
      <main>
        <div>
          By writing your name(s) in the field(s) below, you are legally signing
          this digital form.
        </div>

        <div className={withPrefix("mt-4")}>
          <fieldset>
            <legend className={withPrefix("font-bold mb-2")}>
              Signature method
            </legend>
            <div className={withPrefix("flex gap-4 text-sm")}>
              <label className={withPrefix("inline-flex items-center gap-2")}>
                <input
                  type="radio"
                  name="signature-method"
                  value="draw"
                  checked={signatureMethod === "draw"}
                  onChange={() => {
                    setSignatureMethod("draw");
                    dispatch(
                      updateField({ field: "signature_method", value: "draw" }),
                    );
                    dispatch(
                      updateField({ field: "signature_text", value: "" }),
                    );
                  }}
                />
                Draw signature
              </label>
              <label className={withPrefix("inline-flex items-center gap-2")}>
                <input
                  type="radio"
                  name="signature-method"
                  value="type"
                  checked={signatureMethod === "type"}
                  onChange={() => {
                    setSignatureMethod("type");
                    dispatch(
                      updateField({ field: "signature_method", value: "type" }),
                    );
                    sigCanvas.current?.clear();
                    dispatch(
                      updateField({ field: "signature_image", value: "" }),
                    );
                  }}
                />
                Type signature
              </label>
            </div>
          </fieldset>
        </div>

        {signatureMethod === "type" && (
          <div className={withPrefix("mt-4")}>
            <label
              htmlFor="typed-signature"
              className={withPrefix("font-bold")}
            >
              Typed Signature
            </label>
            <WrappedInput
              id="typed-signature"
              showSearch={false}
              invalid={
                showValidationError &&
                !formData.signature_text &&
                formData.signature_image === ""
              }
              type="text"
              name="typed-signature"
              placeholder="Type your full name"
              value={formData.signature_text || ""}
              onChange={(value: string) => {
                dispatch(updateField({ field: "signature_text", value }));
              }}
              clearAction={() => {
                dispatch(updateField({ field: "signature_text", value: "" }));
              }}
            />
          </div>
        )}

        {signatureMethod === "draw" && (
          <>
            <p
              id="signature-instructions"
              className={withPrefix("mt-4 text-sm text-gray-600")}
            >
              Draw your signature using a mouse, trackpad, or touch.
            </p>
            <div
              className={`${
                formData.signature_image === "" ? "sig-canvas" : ""
              } ${withPrefix(
                "border-1 rounded p-4 mt-4 w-full h-full min-h-[130px] mb-4",
                showValidationError &&
                  formData.signature_image === "" &&
                  !formData.signature_text
                  ? "border-(--validation-error-color)"
                  : "border-gray-300",
              )}`}
              ref={containerRef as unknown as React.RefObject<HTMLDivElement>}
            >
              <SignatureCanvas
                penColor="#26aae1"
                canvasProps={{
                  width: width,
                  height: "200px",
                  className: "sigCanvas",
                  "aria-describedby": "signature-instructions",
                }}
                onEnd={() => {
                  const base64 = sigCanvas.current?.toDataURL();
                  if (base64) {
                    dispatch(
                      updateField({
                        field: "signature_image",
                        value: base64 as string,
                      }),
                    );
                  }
                }}
                ref={sigCanvas}
              />
            </div>
            <Button
              color="white"
              onClick={clearForm}
              aria-label="Clear Primary Signature"
            >
              Clear
            </Button>
          </>
        )}

        {formData.has_secondary_occupant === "true" && (
          <>
            <h3 className={withPrefix("font-bold mb-2 mt-4")}>
              Signature of Secondary Account Holder
            </h3>
            <fieldset>
              <legend className={withPrefix("font-bold mb-2")}>
                Secondary signature method
              </legend>
              <div className={withPrefix("flex gap-4 text-sm")}>
                <label className={withPrefix("inline-flex items-center gap-2")}>
                  <input
                    type="radio"
                    name="secondary-signature-method"
                    value="draw"
                    checked={secondarySignatureMethod === "draw"}
                    onChange={() => {
                      setSecondarySignatureMethod("draw");
                      dispatch(
                        updateField({
                          field: "secondary_signature_method",
                          value: "draw",
                        }),
                      );
                      dispatch(
                        updateField({
                          field: "secondary_signature_text",
                          value: "",
                        }),
                      );
                    }}
                  />
                  Draw signature
                </label>
                <label className={withPrefix("inline-flex items-center gap-2")}>
                  <input
                    type="radio"
                    name="secondary-signature-method"
                    value="type"
                    checked={secondarySignatureMethod === "type"}
                    onChange={() => {
                      setSecondarySignatureMethod("type");
                      dispatch(
                        updateField({
                          field: "secondary_signature_method",
                          value: "type",
                        }),
                      );
                      sigCanvas2.current?.clear();
                      dispatch(
                        updateField({
                          field: "secondary_signature_image",
                          value: "",
                        }),
                      );
                    }}
                  />
                  Type signature
                </label>
              </div>
            </fieldset>

            {secondarySignatureMethod === "type" && (
              <div className={withPrefix("mt-4")}>
                <label
                  htmlFor="typed-secondary-signature"
                  className={withPrefix("font-bold")}
                >
                  Typed Secondary Signature
                </label>
                <WrappedInput
                  id="typed-secondary-signature"
                  showSearch={false}
                  invalid={
                    showValidationError &&
                    !formData.secondary_signature_text &&
                    formData.secondary_signature_image === ""
                  }
                  type="text"
                  name="typed-secondary-signature"
                  placeholder="Type full name"
                  value={formData.secondary_signature_text || ""}
                  onChange={(value: string) => {
                    dispatch(
                      updateField({
                        field: "secondary_signature_text",
                        value,
                      }),
                    );
                  }}
                  clearAction={() => {
                    dispatch(
                      updateField({
                        field: "secondary_signature_text",
                        value: "",
                      }),
                    );
                  }}
                />
              </div>
            )}

            {secondarySignatureMethod === "draw" && (
              <>
                <p
                  id="secondary-signature-instructions"
                  className={withPrefix("mt-4 text-sm text-gray-600")}
                >
                  Draw the secondary signature using a mouse, trackpad, or
                  touch.
                </p>
                <div
                  className={`${
                    formData.secondary_signature_image === ""
                      ? "sig-canvas"
                      : ""
                  } ${withPrefix(
                    "border-1 rounded p-4 mt-4 w-full h-full min-h-[130px] mb-4",
                    showValidationError &&
                      formData.secondary_signature_image === "" &&
                      !formData.secondary_signature_text
                      ? "border-(--validation-error-color)"
                      : "border-gray-300",
                  )}`}
                >
                  <SignatureCanvas
                    penColor="#26aae1"
                    canvasProps={{
                      width: width,
                      height: "200px",
                      className: "sigCanvas2",
                      "aria-describedby": "secondary-signature-instructions",
                    }}
                    onEnd={() => {
                      const base64 = sigCanvas2.current?.toDataURL();
                      if (base64) {
                        dispatch(
                          updateField({
                            field: "secondary_signature_image",
                            value: base64 as string,
                          }),
                        );
                      }
                    }}
                    ref={sigCanvas2}
                  />
                </div>
                <Button
                  color="white"
                  onClick={clearForm2}
                  aria-label="Clear Secondary Signature"
                >
                  Clear
                </Button>
              </>
            )}
          </>
        )}

        <CheckboxField
          className={withPrefix(
            "border-1 rounded-md pf:overflow-hidden p-2 mt-4",
            showValidationError && formData.verify_entered_information === ""
              ? "border-(--validation-error-color)"
              : "border-transparent",
          )}
        >
          <FormCheckbox
            color="green"
            value={formData.verify_entered_information}
            name="verify_entered_information"
            checked={formData.verify_entered_information == "true"}
            onChange={(checked) => {
              dispatch(
                updateField({
                  field: "verify_entered_information",
                  value: checked ? "true" : "",
                }),
              );
            }}
          />
          <Label className={withPrefix("!font-bold")}>
            I verify that all information entered is correct
          </Label>
        </CheckboxField>
      </main>

      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage
          show={showValidationError}
          id="/page8"
          announceKey={announceKey}
        />
        <FooterWrapper>
          <NavButton
            label="Submit"
            action={() => {
              if (pageIsValid) {
                navigate("/form_page9");
              } else {
                setShowValidationError(true);
                setAnnounceKey((current) => current + 1);
              }
            }}
            currentPage="page8"
            disabledButClickable={!pageIsValid}
          />
        </FooterWrapper>
      </div>
    </div>
  );
}

export default FormPage8;
