import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";

import { validateForm } from "./utils/validateForm";
import { withPrefix } from "./utils/withPrefix";

interface StepperProps {
  currentFormPage: string;
}

function Stepper({ currentFormPage }: StepperProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const pageValidations = validateForm(formData);
  const getHashFromCurrentBrowserUrl = () => {
    const url = window.location.href;
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      let str = url
        .substring(hashIndex + 1)
        .replace("#", "")
        .replace("/", "")
        .replace("form_", "");
      if (str.indexOf("page") === -1) {
        str = "page1";
      }
      return str;
    } else {
      return "";
    }
  };

  let currentPageNumber = getHashFromCurrentBrowserUrl().replace("page", "");
  if (currentPageNumber === "") {
    currentPageNumber = "1";
  }

  return (
    <div className={withPrefix(`relative w-full bg-(--stepper-bg) p-[16px]`)}>
      <div
        className={withPrefix(
          "bg-(--stepper-line) m-4 w-[calc(100%-30px)] m-auto  mt-[8px] h-[1px]  absolute shadow-md",
        )}
      ></div>
      <div
        className={withPrefix(
          "m-auto flex relative justify-between w-[calc(100%-30px)]",
        )}
      >
        {pageValidations.map((requirement: any, index: number) => {
          return (
            <div
              key={requirement.id}
              className={withPrefix("w-[16px] h-[16px] ml-[-16px] mr-[-16px]")}
              onClick={() => {
                // navigate(
                //   requirement.id === "/"
                //     ? requirement.id
                //     : `form_${requirement.id.replace("/", "")}`
                // );
              }}
            >
              <div
                key={`stepper-status-${requirement.id}`}
                className={withPrefix([
                  "pf:justify-center",
                  "shadow-md",
                  "w-[16px] h-[16px]",
                  "rounded-xl",
                  index + 1 <= Number(currentPageNumber)
                    ? "bg-(--primary-color)"
                    : "bg-(--stepper-unselected) border border-(--stepper-unselected-border)",
                ])}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;
