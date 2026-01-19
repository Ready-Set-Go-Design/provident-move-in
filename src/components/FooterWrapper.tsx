import { withPrefix } from "../utils/withPrefix";

export const FooterWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={withPrefix(
        "mt-4 w-full fixed bottom-0 left-0 right-0 p-4 bg-gray-100 pb-6 flex gap-2",
      )}
    >
      {children}
    </div>
  );
};
