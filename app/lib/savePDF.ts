import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { InputState } from "./typesAndInterfaces";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

export const savePDF = (
  userName: string | undefined,
  setCurrentUserData: { (userData: InputState): void; (arg0: any): void },
  currentUserData: InputState
) => {
  const capture = document.querySelector(".write-blues-changes");

  html2canvas(capture as HTMLElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
    const pdfBlob = pdf.output("blob");
    const storageRef = ref(storage, `${userName}-write-blues-changes.pdf`);

    uploadBytes(storageRef, pdfBlob)
      .then((snapshot) => {
        console.log("PDF uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading PDF: ", error);
      });

    getDownloadURL(storageRef)
      .then((url) => {
        console.log("URL: ", url);
        setCurrentUserData({ ...currentUserData, bluesUrl: url });
      })
      .catch((error) => {
        console.error("Error getting download URL: ", error);
      });
  });
};
