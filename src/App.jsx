import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FormStatus from "./FormStatus";

function App() {
  const [currentFormPage, setCurrentFormPage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const updateFormData = (key, data) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: data,
    }));
  };
  const location = useLocation();

  useEffect(() => {
    setCurrentFormPage(location.pathname);
  }, [location]);

  const isFormDataValid = () => {
    let isValid = true;
    if (
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.email === ""
    ) {
      isValid = false;
    }
    if (formData.email !== "" && !formData.email.includes("@")) {
      isValid = false;
    }

    return isValid;
  };
  return (
    <>
      <h1 className="p-4 text-2xl">Form Test</h1>

      <FormStatus formData={formData} currentFormPage={currentFormPage} />
      <Routes>
        <Route
          path={"/"}
          element={
            <FormPage1 updateFormData={updateFormData} formData={formData} />
          }
        />
        <Route
          path="/form_page2"
          element={
            <FormPage2 updateFormData={updateFormData} formData={formData} />
          }
        />
        <Route
          path="/form_page3"
          element={
            <FormPage3
              updateFormData={updateFormData}
              formData={formData}
              isFormDataValid={isFormDataValid}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
