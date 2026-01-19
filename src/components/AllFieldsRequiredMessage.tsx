import { withPrefix } from "../utils/withPrefix";
import { validateForm } from "../utils/validateForm";
import { useSelector } from "react-redux";

export function AllFieldsRequiredMessage({
  show,
  id,
  override,
}: {
  show: boolean;
  id: string;
  override?: string;
}) {
  const formData = useSelector((state: any) => state.form);
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === id,
  );

  const { errors } = validatedForm;

  if (show) {
    if (errors.length > 0 || override) {
      return (
        <div
          className={withPrefix(
            "text-sm text-black bg-(--validation-error-color) rounded-lg p-2 grid grid-cols-[48px_1fr] gap-2",
          )}
        >
          <div className={withPrefix("w-[48px]")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={withPrefix("w-full")}
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <span>{override ? override : errors.join(", ")}</span>
          </div>
        </div>
      );
    }
  }
}
