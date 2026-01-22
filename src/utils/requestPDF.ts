export const requestPDF = async (submissionId: string | true | string[]) => {
  try {
    const data = { id: submissionId, type: "movein" };
    const response = await fetch(
      `${(import.meta as any).env.VITE_API_URL}/submissions/pdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if the response is a PDF (binary data)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/pdf")) {
      // Handle PDF response
      const pdfBlob = await response.blob();

      const link = document.createElement("a");
      const url = URL.createObjectURL(pdfBlob);
      link.href = url;
      link.download = "new_customer_form.pdf";
      // Append to body, click, then remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Clean up the object URL
      URL.revokeObjectURL(url);
    } else {
      // Handle JSON response (fallback)
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    //@ts-ignore
    return { result: false, error: error.message };
  }
};
