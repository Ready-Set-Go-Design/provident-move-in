import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";

import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { Select } from "./components/select";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { useState } from "react";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { validateForm } from "./utils/validateForm";
import { FooterWrapper } from "./components/FooterWrapper";

const ServiceType = ({
  label,
  icon,
  value,
  dispatch,
}: {
  label: string;
  value: string;
  icon: any;

  dispatch: any;
}) => {
  const formData = useSelector((state: RootState) => state.form);
  const setServiceType = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log();
    dispatch(updateField({ field: "occupancy_type", value: value }));
  };

  return (
    <div
      className={withPrefix(
        "bg-gray-100 p-2 relative rounded-lg cursor-pointer hover:bg-gray-300 w-full border border-gray-400 flex flex-col items-center ",
      )}
      onClick={setServiceType}
    >
      <div
        className={withPrefix([
          "border ",
          formData.occupancy_type === value
            ? "border-(--primary-color) bg-(--primary-color)"
            : "border-gray-400 bg-white",
          "left-2 top-2 absolute text-lg w-[18px] h-[18px] rounded-full",
        ])}
      ></div>
      <div
        className={withPrefix(
          `h-[56px] w-[56px] fill-(--primary-color) mt-2 mb-4 `,
        )}
      >
        {icon}
      </div>
      <span className={withPrefix("text-sm")}>{label}</span>
    </div>
  );
};

function FormPage1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  const pageIsValid = isPageValid("/");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/",
  );

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>
        Customer Service Agreement
      </h1>

      <div>
        Please answer a few questions to better help us prepare your move in.
      </div>

      <div className={withPrefix("font-bold text-md mt-6 mb-2")}>
        Choose an option
      </div>
      <div
        className={withPrefix(
          "inline-flex gap-2 w-full rounded-md pf:overflow-hidden border-1",
          showValidationError && formData.occupancy_type === ""
            ? "border-red-500"
            : "border-transparent",
        )}
      >
        <ServiceType
          label="Tenant"
          value="TENANT"
          dispatch={dispatch}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={withPrefix("w-full text-(--primary-color)")}
            >
              <path
                fill-rule="evenodd"
                d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                clip-rule="evenodd"
              />
            </svg>
          }
        />
        <ServiceType
          label="Home Owner"
          value="HOME_OWNER"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={withPrefix("w-full text-(--primary-color)")}
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          }
          dispatch={dispatch}
        />
      </div>

      <div className={withPrefix("mb-8 mt-8")}>
        <strong>Occupancy Date</strong>

        <div className={withPrefix("flex gap-2")}>
          <Select
            value={formData.occupancy_day}
            onChange={(e) => {
              dispatch(
                updateField({ field: "occupancy_day", value: e.target.value }),
              );
            }}
            invalid={showValidationError && formData.occupancy_day === ""}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Select
            value={formData.occupancy_month}
            onChange={(e) => {
              dispatch(
                updateField({
                  field: "occupancy_month",
                  value: e.target.value,
                }),
              );
            }}
            invalid={showValidationError && formData.occupancy_month === ""}
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </Select>
          <Select
            value={formData.occupancy_year}
            onChange={(e) => {
              dispatch(
                updateField({ field: "occupancy_year", value: e.target.value }),
              );
            }}
            invalid={showValidationError && formData.occupancy_year === ""}
          >
            <option value="">Year</option>
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i + 2025} value={i + 2025}>
                {i + 2025}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage show={showValidationError} id="/" />
        <FooterWrapper>
          <NavButton
            label="Save and Continue"
            action={() => {
              if (pageIsValid) {
                navigate(from ? `/form_${from}` : "/form_page2");
              } else {
                setShowValidationError(true);
              }
            }}
            currentPage="page1"
            disabledButClickable={!validatedForm.valid}
          />
        </FooterWrapper>
      </div>
    </div>
  );
}

export default FormPage1;
