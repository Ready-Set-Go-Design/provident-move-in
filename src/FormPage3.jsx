import { useState } from "react";
import { useNavigate } from "react-router";
function FormPage3({ formData, updateFormData, isFormDataValid }) {
  const navigate = useNavigate();
  const [submittingForm, setSubmittingForm] = useState(false);
  const [formSubmitStatus, setFormSubmitStatus] = useState("");

  const submitForm = () => {
    setSubmittingForm(true);

    setTimeout(() => {
      setSubmittingForm(false);
      setFormSubmitStatus("success");
    }, 2000);
  };

  return (
    <div className="p-4">
      <div></div>
      <h2>Form - Page 3</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        disabled={submittingForm === true}
        className="p-2 border border-gray-300 rounded"
        value={formData.email}
        onChange={(e) => {
          updateFormData("email", e.currentTarget.value);
        }}
      />

      {submittingForm && <p>Submitting...</p>}
      {!submittingForm && formSubmitStatus !== "success" && (
        <p className="mt-4">
          <button
            className={`${
              isFormDataValid()
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-300"
            }  text-white font-bold py-2 px-4 rounded`}
            onClick={() => submitForm()}
            disabled={!isFormDataValid()}
          >
            Submit Form
          </button>

          {!isFormDataValid && (
            <span style={{ color: "red" }}>Form is not valid</span>
          )}
        </p>
      )}

      {formSubmitStatus === "success" && (
        <p className="mt-4">
          Form Submitted!{" "}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Submit Again?
          </button>
        </p>
      )}
    </div>
  );
}

export default FormPage3;
