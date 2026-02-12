import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";

import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { Select } from "./components/select";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { useRef, useState } from "react";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { validateForm } from "./utils/validateForm";
import { FooterWrapper } from "./components/FooterWrapper";

const ServiceType = ({
  label,
  icon,
  value,
  name,
  checked,
  onChange,
  describedById,
  inputRef,
}: {
  label: string;
  value: string;
  icon: any;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
  describedById?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <label
      className={withPrefix(
        "bg-gray-100 p-2 relative rounded-lg cursor-pointer hover:bg-gray-300 w-full border border-gray-400 flex flex-col items-center focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500",
        checked ? "border-(--primary-color)" : "border-gray-400",
      )}
    >
      <input
        className={withPrefix("sr-only")}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        aria-describedby={describedById}
        aria-label={label}
        ref={inputRef}
        onChange={() => onChange(value)}
      />
      <div
        aria-hidden={true}
        className={withPrefix([
          "border ",
          checked
            ? "border-(--primary-color) bg-(--primary-color)"
            : "border-gray-400 bg-white",
          "left-2 top-2 absolute text-lg w-[18px] h-[18px] rounded-full",
        ])}
      ></div>
      <div
        aria-hidden={true}
        className={withPrefix(
          `h-[56px] w-[56px] fill-(--primary-color) mt-2 mb-4 `,
        )}
      >
        {icon}
      </div>
      <span className={withPrefix("text-sm")} aria-hidden={true}>
        {label}
      </span>
    </label>
  );
};

function FormPage1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formErrorId = "form-errors";
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const [announceKey, setAnnounceKey] = useState<number>(0);
  const tenantInputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  const pageIsValid = isPageValid("/");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/",
  );

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h2 className={withPrefix("py-4 text-2xl")}>
        Customer Service Agreement
      </h2>
      <main>
        <fieldset
          aria-describedby={
            showValidationError && formData.occupancy_type === ""
              ? formErrorId
              : undefined
          }
          aria-invalid={showValidationError && formData.occupancy_type === ""}
          className={withPrefix("mt-6")}
        >
          <legend className={withPrefix("font-bold text-md mb-2")}>
            Choose an option
          </legend>
          <div
            className={withPrefix(
              "inline-flex gap-2 w-full rounded-md overflow-hidden border-1 ",
              showValidationError && formData.occupancy_type === ""
                ? "border-(--validation-error-color)"
                : "border-transparent",
            )}
          >
            <ServiceType
              label="Tenant"
              value="TENANT"
              name="occupancy_type"
              checked={formData.occupancy_type === "TENANT"}
              describedById={
                showValidationError && formData.occupancy_type === ""
                  ? formErrorId
                  : undefined
              }
              inputRef={tenantInputRef}
              onChange={(nextValue) => {
                dispatch(
                  updateField({ field: "occupancy_type", value: nextValue }),
                );
                if (nextValue === "TENANT") {
                  dispatch(
                    updateField({ field: "selling_or_renting", value: "" }),
                  );
                }
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={withPrefix("w-full text-(--primary-color)")}
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
            <ServiceType
              label="Home Owner"
              value="HOME_OWNER"
              name="occupancy_type"
              checked={formData.occupancy_type === "HOME_OWNER"}
              describedById={
                showValidationError && formData.occupancy_type === ""
                  ? formErrorId
                  : undefined
              }
              onChange={(nextValue) => {
                dispatch(
                  updateField({ field: "occupancy_type", value: nextValue }),
                );
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={withPrefix("w-full text-(--primary-color)")}
                  aria-hidden="true"
                >
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
              }
            />
          </div>
        </fieldset>

        <div className={withPrefix("mb-8 mt-8")}>
          <strong>Occupancy Date</strong>

          <div className={withPrefix("flex gap-2")}>
            <label className={withPrefix("sr-only")} htmlFor="occupancy-day">
              Occupancy Day
            </label>
            <Select
              id="occupancy-day"
              value={formData.occupancy_day}
              onChange={(e) => {
                dispatch(
                  updateField({
                    field: "occupancy_day",
                    value: e.target.value,
                  }),
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
            <label className={withPrefix("sr-only")} htmlFor="occupancy-month">
              Occupancy Month
            </label>
            <Select
              id="occupancy-month"
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
            <label className={withPrefix("sr-only")} htmlFor="occupancy-year">
              Occupancy Year
            </label>
            <Select
              id="occupancy-year"
              value={formData.occupancy_year}
              onChange={(e) => {
                dispatch(
                  updateField({
                    field: "occupancy_year",
                    value: e.target.value,
                  }),
                );
              }}
              invalid={showValidationError && formData.occupancy_year === ""}
            >
              <option value="">Year</option>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i + 2026} value={i + 2026}>
                  {i + 2026}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </main>
      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage
          show={showValidationError}
          id="/"
          announceKey={announceKey}
        />
        <FooterWrapper>
          <NavButton
            label="Save and Continue"
            action={() => {
              if (pageIsValid) {
                navigate(from ? `/form_${from}` : "/form_page2");
              } else {
                setShowValidationError(true);
                setAnnounceKey((current) => current + 1);
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
