import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "../../../pdf.worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer({ pdf }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <>
      {pdf && (
        <Document
          file={pdf.url}
          onLoadSuccess={onDocumentLoadSuccess}
          width="100%"
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      )}
    </>
  );
}
