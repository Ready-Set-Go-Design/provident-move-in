import { useNavigate } from "react-router";

function FormStatus({ formData, currentFormPage }) {
  const navigate = useNavigate();
  return (
    <div className="m-4 flex">
      <span
        className={` cursor-pointer p-2 rounded-[30px] mr-4 ${
          currentFormPage === "/" ? "bg-gray-200" : ""
        }`}
        onClick={() => navigate("/")}
      >
        {formData.first_name > "" && <span className="text-green-600">✓</span>}
        {formData.first_name === "" && <span className="text-red-600">✗</span>}
      </span>
      <span
        className={` cursor-pointer p-2 rounded-[30px] mr-4 ${
          currentFormPage === "/form_page2" ? "bg-gray-200" : ""
        }`}
        onClick={() => navigate("/form_page2")}
      >
        {formData.last_name > "" && <span className="text-green-600">✓</span>}
        {formData.last_name === "" && <span className="text-red-600">✗</span>}
      </span>
      <span
        className={` cursor-pointer p-2 rounded-[30px] mr-4 ${
          currentFormPage === "/form_page3" ? "bg-gray-200" : ""
        }`}
        onClick={() => navigate("/form_page3")}
      >
        {formData.email.includes("@") && formData.email.length >= 6 && (
          <span className="text-green-600">✓</span>
        )}
        {(!formData.email.includes("@") || formData.email.length < 6) && (
          <span className="text-red-600">✗</span>
        )}
      </span>
    </div>
  );
}

export default FormStatus;
