import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { storage } from "../../firebase/config";

// Captures the blues chord chart, uploads it as a PDF to Firebase Storage under
// the student's uid, and returns the download URL. Throws on failure.
export const savePDF = async (
  userId: string,
  displayName: string | null | undefined,
): Promise<string> => {
  const capture = document.querySelector(".write-blues-changes");
  if (!capture) throw new Error("Element not found");

  const canvas = await html2canvas(capture as HTMLElement);
  const imgData = canvas.toDataURL("image/jpeg");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
  const pdfBlob = pdf.output("blob");

  const safeName = (displayName || "student")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .slice(0, 60);
  const storageRef = ref(
    storage,
    `students/${userId}/${safeName}-write-blues-changes.pdf`,
  );

  await uploadBytes(storageRef, pdfBlob);
  return getDownloadURL(storageRef);
};
