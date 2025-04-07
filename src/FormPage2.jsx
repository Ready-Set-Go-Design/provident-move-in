import { useNavigate } from "react-router";

function FormPage2({ formData, updateFormData }) {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div></div>
      <h2>Form - Page 2</h2>
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        className="p-2 border border-gray-300 rounded"
        onChange={(e) => {
          updateFormData("last_name", e.currentTarget.value);
        }}
      />
      <p className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/form_page3")}
        >
          Next
        </button>
      </p>
    </div>
  );
}

export default FormPage2;
