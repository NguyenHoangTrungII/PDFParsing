// import React, { useState } from "react";
// import styles from "./UploadFiled.module.scss";
// import classNames from "classnames/bind";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const cx = classNames.bind(styles);

// function UploadFiled() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pdfFile, setPdfFile] = useState(null);

//   const readPDFFile = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPdfFile(file);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//       <input type="file" onChange={(e) => readPDFFile(e)} />
//       {pdfFile && (
//         <div className={cx("pdfContainer")}>
//           <Document
//             file={pdfFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//           >
//             <Page pageNumber={pageNumber} />
//           </Document>
//           <p>
//             Page {pageNumber} of {numPages}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadFiled;


// import React, { useState } from "react";
// import styles from "./UploadFiled.module.scss";
// import classNames from "classnames/bind";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const cx = classNames.bind(styles);

// function UploadFiled() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [textArray, setTextArray] = useState([]);

//   const readPDFFile = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPdfFile(file);
//       extractTextFromPDF(file);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const extractTextFromPDF = async (file) => {
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const arrayBuffer = e.target.result;
//       const pdf = await pdfjs.getDocument(arrayBuffer).promise;
//       let texts = [];
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         //check-here
//         //next is EOL = true and Wild + height is big enough => new context
//         const pageText = textContent.items.map((item) => item.str).join(" ");
//         texts.push(pageText);

//         console.log(textContent);
//       }
//       setTextArray(texts);

//     };
//     reader.readAsArrayBuffer(file);
//   };

//   console.log(textArray);


//   return (
//     <div>
//       <input type="file" onChange={(e) => readPDFFile(e)} />
//       {pdfFile && (
//         <div className={cx("pdfContainer")}>
//           <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//             <Page pageNumber={pageNumber} />
//           </Document>
//           <p>
//             Page {pageNumber} of {numPages}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadFiled;

import React, { useState } from "react";
import styles from "./UploadFiled.module.scss";
import classNames from "classnames/bind";
import { Document, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import GroupLinesIntoSections from "../../helpers/inline";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const cx = classNames.bind(styles);

function UploadFiled() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [lines, setLines] = useState([]);

  const readPDFFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    parsePdf();
  };

  const parsePdf = async () => {
    if (!pdfFile) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const typedArray = new Uint8Array(event.target.result);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      let allLines = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageLines = textContent.items.map((item) => item.str);
        allLines = [...allLines, ...pageLines];
      }

      setLines(allLines);
    };

    reader.readAsArrayBuffer(pdfFile);
  };

  GroupLinesIntoSections(lines);

  return (
    <div>
      <input type="file" onChange={(e) => readPDFFile(e)} />
      {pdfFile && (
        <div className={cx("pdfContainer")}>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </Document>
        </div>
      )}
      <div>
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default UploadFiled;


// import React, { useState } from "react";
// import styles from "./UploadFiled.module.scss";
// import classNames from "classnames/bind";
// import { Document, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const cx = classNames.bind(styles);

// function UploadFiled() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [contentFromEducation, setContentFromEducation] = useState(null);

//   const readPDFFile = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPdfFile(file);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//     parsePdf();
//   };

//   const parsePdf = async () => {
//     if (!pdfFile) return;

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const typedArray = new Uint8Array(event.target.result);
//       const pdf = await pdfjs.getDocument(typedArray).promise;

//       let content = '';
//       let isEducationFound = false;

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items.map((item) => item.str).join(' ');

//         if (isEducationFound) {
//           content += pageText;
//         } else if (pageText.toLowerCase().includes('education')) {
//           isEducationFound = true;
//           content += pageText.substring(pageText.toLowerCase().indexOf('education'));
//         }
//       }

//       setContentFromEducation(content);
//     };

//     reader.readAsArrayBuffer(pdfFile);
//   };

//   return (
//     <div>
//       <input type="file" onChange={(e) => readPDFFile(e)} />
//       {pdfFile && (
//         <div className={cx("pdfContainer")}>
//           <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//             <p>
//               Page {pageNumber} of {numPages}
//             </p>
//           </Document>
//         </div>
//       )}
//       {contentFromEducation && (
//         <div>
//           <h2>Content from Education:</h2>
//           <p>{contentFromEducation}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadFiled;

// import React, { useState } from "react";
// import styles from "./UploadFiled.module.scss";
// import classNames from "classnames/bind";
// import { Document, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const cx = classNames.bind(styles);

// function UploadFiled() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [educationContent, setEducationContent] = useState(null);
//   const [workExperienceContent, setWorkExperienceContent] = useState(null);
//   const [langugasContent, setLanguasContent] = useState(null);
//   const [skillContent, setSkillContent] = useState(null);



//   const readPDFFile = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPdfFile(file);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//     parsePdf();
//   };

//   const parsePdf = async () => {
//     if (!pdfFile) return;

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const typedArray = new Uint8Array(event.target.result);
//       const pdf = await pdfjs.getDocument(typedArray).promise;

//       let educationContent = '';
//       let workExperienceContent = '';
//       let langugasContent = '';
//       let skillContent= '';
//       let isEducationFound = false;
//       let isWorkExperienceFound = false;
//       let isLangugasFound = false;
//       let isSkillFound = false;

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items.map((item) => item.str).join(' ');

//         if (isEducationFound) {
//           educationContent += pageText;
//         } else if (pageText.toLowerCase().includes('education')) {
//           isEducationFound = true;
//           educationContent += pageText.substring(pageText.toLowerCase().indexOf('education'));
//         }

//         if (isWorkExperienceFound) {
//           workExperienceContent += pageText;
//         } else if (pageText.toLowerCase().includes('work experience')) {
//           isWorkExperienceFound = true;
//           workExperienceContent += pageText.substring(pageText.toLowerCase().indexOf('work experience'));
//         }

//         if (isLangugasFound) {
//             langugasContent += pageText;
//           } else if (pageText.toLowerCase().includes('languages')) {
//             isLangugasFound = true;
//             langugasContent += pageText.substring(pageText.toLowerCase().indexOf('languages'));
//           }

//           if (isSkillFound) {
//             skillContent += pageText;
//           } else if (pageText.toLowerCase().includes('languages')) {
//             isLangugasFound = true;
//             skillContent += pageText.substring(pageText.toLowerCase().indexOf('languages'));
//           }
//       }

//       setEducationContent(educationContent);
//       setWorkExperienceContent(workExperienceContent);
//       setLanguasContent(langugasContent);
//       setSkillContent(skillContent)
//     };

//     reader.readAsArrayBuffer(pdfFile);
//   };

//   return (
//     <div>
//       <input type="file" onChange={(e) => readPDFFile(e)} />
//       {pdfFile && (
//         <div className={cx("pdfContainer")}>
//           <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//             <p>
//               Page {pageNumber} of {numPages}
//             </p>
//           </Document>
//         </div>
//       )}
//       {educationContent && (
//         <div>
//           <h2>Education:</h2>
//           <p>{educationContent}</p>
//         </div>
//       )}
//       {workExperienceContent && (
//         <div>
//           <h2>Work Experience:</h2>
//           <p>{workExperienceContent}</p>
//         </div>
//       )}
//       {langugasContent && (
//         <div>
//           <h2>Language:</h2>
//           <p>{langugasContent}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UploadFiled;





