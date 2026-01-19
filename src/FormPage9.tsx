import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "./store/formSlice";
import { clearSubmission, updateField } from "./store/submissionSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import ReactPDF from "@react-pdf/renderer";

import { withPrefix } from "./utils/withPrefix";
import PDFTemplate from "./PDFTemplate";
import { Button } from "./components/button";
import { useEffect, useRef } from "react";
import { submitForm } from "./utils/submitForm";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage9() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);
  const formData = useSelector((state: RootState) => state.form);
  const submissionData = useSelector((state: RootState) => state.submission);

  const { submitted, error } = submissionData;

  useEffect(() => {
    // submit form
    if (!submitted && formData && !hasSubmitted.current) {
      doSubmitForm();
      hasSubmitted.current = true;
    }
  }, [submitted, formData]);

  const doSubmitForm = async () => {
    try {
      const submission = await submitForm(formData);

      if (submission.result === true) {
        dispatch(updateField({ field: "submitted", value: true }));
      } else {
        dispatch(updateField({ field: "error", value: submission.error }));
      }
    } catch (error) {
      dispatch(updateField({ field: "error", value: error as string }));
    }
  };

  if (!submitted && !error) {
    return (
      <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
        <h1 className={withPrefix("py-4 text-2xl")}>Submitting Agreement...</h1>
      </div>
    );
  }

  if (!submitted && error) {
    return (
      <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
        <h1 className={withPrefix("py-4 text-2xl")}>Submission Error</h1>
        <div className={withPrefix("mb-4")}>
          <div className={withPrefix("mt-4 mb-4")}>
            There was a problem submitting your agreement. Please go back and
            try again.
          </div>
        </div>
        <div className={withPrefix("mt-8 flex")}>
          <FooterWrapper>
            <NavButton
              outline={true}
              action={() => {
                dispatch(clearForm());
                dispatch(clearSubmission());
                navigate("/");
              }}
              label={"Return to Homepage"}
              currentPage=""
            />
          </FooterWrapper>
        </div>
      </div>
    );
  }

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>Submission Complete</h1>
      <div className={withPrefix("mb-4")}>
        <h1>
          Thanks for completing the Customer Service Agreement with Provident
          Energy Management Inc.
        </h1>
        <div className={withPrefix("mb-4 mt-4")}>
          A copy of this contract will be sent to{" "}
          <strong>{formData.email}</strong>.
        </div>
      </div>
      <div className={withPrefix("flex gap-2 mt-8")}>
        <Button
          onClick={async () => {
            const blob = await ReactPDF.pdf(
              <PDFTemplate formData={formData} />,
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "new_customer_form.pdf";
            link.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download PDF
        </Button>
      </div>
      <FooterWrapper>
        <NavButton
          outline={true}
          action={() => {
            dispatch(clearForm());
            dispatch(clearSubmission());
            navigate("/");
          }}
          label={"Return to Homepage"}
          currentPage=""
        />
      </FooterWrapper>
    </div>
  );
}

export default FormPage9;
