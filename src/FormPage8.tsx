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
import { Checkbox, CheckboxField } from "./components/checkbox";
import { Button } from "./components/button";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage8() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page8");

  const clearForm = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      dispatch(updateField({ field: "signature_image", value: "" }));
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
  };

  useEffect(() => {
    const handleResize = () => {
      setTimeout(redrawSignature, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [formData.signature_image]);

  useEffect(() => {
    const timeoutId = setTimeout(redrawSignature, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>Signature</h1>
      <div className={withPrefix("mb-4")}>
        <div>
          By typing your name in the fields below, you are legally signing this
          digital form.
        </div>

        <div
          className={withPrefix(
            "border-1 rounded p-4 mt-4 w-full h-full min-h-[130px] mb-4",
            showValidationError && formData.signature_image === ""
              ? "border-red-500"
              : "border-gray-300",
          )}
          ref={containerRef as unknown as React.RefObject<HTMLDivElement>}
        >
          <SignatureCanvas
            penColor="#26aae1"
            canvasProps={{
              width: width,
              height: "200px",
              className: "sigCanvas",
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
        <Button color="white" onClick={clearForm}>
          Clear
        </Button>
        <CheckboxField
          className={withPrefix(
            "border-1 rounded-md pf:overflow-hidden p-2 mt-4",
            showValidationError && formData.verify_entered_information === ""
              ? "border-red-500"
              : "border-transparent",
          )}
        >
          <Checkbox
            color="green"
            name="verify_entered_information"
            value={formData.verify_entered_information}
            checked={formData.verify_entered_information == "true"}
            onChange={(checked) => {
              dispatch(
                updateField({
                  field: "verify_entered_information",
                  value: checked ? "true" : "",
                }),
              );
            }}
          />{" "}
          I verify that all information entered is correct
        </CheckboxField>
      </div>

      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage show={showValidationError} id="/page8" />
        <FooterWrapper>
          <NavButton
            label="Submit"
            action={() => {
              if (pageIsValid) {
                navigate("/form_page9");
              } else {
                setShowValidationError(true);
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
