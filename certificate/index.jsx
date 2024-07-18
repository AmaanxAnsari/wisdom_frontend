import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button, Container, Link } from "@mui/material";
// import dotenv from "dotenv";
// import pdfjs from "pdfjs-dist";
// import html2canvas from "html2canvas";

const Certificate = () => {
  // const {id} = useParams();
  // dotenv.config();
  const location = useLocation();
  const { data } = location.state;
  const [pdfUrl_state, setPdfUrl] = useState(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    // https://drive.google.com/file/d/17ls8hYMtGV4MsEgbKS93FMMYFZSdkHP0/view?usp=drive_link

    // const createPdf = async () => {
    //   const existingPdfBytes = await fetch(
    //     "https://drive.google.com/file/d/17ls8hYMtGV4MsEgbKS93FMMYFZSdkHP0/view?usp=drive_link"
    //   ).then((response) => response.arrayBuffer());

    //   const pdfDoc = await PDFDocument.load(existingPdfBytes);

    //   const modifiedPdfBytes = await pdfDoc.save();
    //   const modifiedPdfDataUri = `data:application/pdf;base64,${modifiedPdfBytes.toString(
    //     "base64"
    //   )}`;

    //   console.log(modifiedPdfDataUri);
    //   const link = document.createElement("a");
    //   link.href = modifiedPdfDataUri;
    //   link.download = "certificate.pdf";
    //   link.click();
    // };
    //"https://i.imgur.com/0BZsFWF.png"
    async function createPdf() {
      const pngUrl = "https://i.imgur.com/vZUkyNN.png?1";

      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      const page = pdfDoc.addPage([1000, 770]);
      const { width, height } = page.getSize();
      const fontSize = 36;

      const pngImageBytes = await fetch(pngUrl).then((res) =>
        res.arrayBuffer()
      );

      const pngImage = await pdfDoc.embedPng(pngImageBytes);

      const pngDims = pngImage.scale(0.5);

      page.drawImage(pngImage, {
        x: page.getWidth() / 2 - pngDims.width / 2,
        y: page.getHeight() / 2 - pngDims.height + 385,
        width: pngDims.width,
        height: pngDims.height,
      });
      page.drawText(data.name, {
        x: width / 2 - fontSize - 50,
        y: height - 4 * fontSize - 250,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });
      const courseSize = 18;
      page.drawText("FULL STACK WEB DEVELOPMENT-MERN STACK", {
        x: width / 2 - courseSize - 50,
        y: height - 4 * courseSize - 368,
        size: courseSize,
        font: timesRomanFont,
        color: rgb(1, 0, 0),
      });
      const dateSize = 18;
      page.drawText(" 2ND JANUARY TO 31ST MARCH ", {
        x: dateSize + 550,
        y: height - 4 * dateSize - 405,
        size: dateSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      const endDateSize = 18;
      page.drawText("31 ST OF MARCH, 2023 ", {
        x: endDateSize + 675,
        y: height - 4 * endDateSize - 510,
        size: endDateSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      const idSize = 18;
      page.drawText(" WS230327", {
        x: dateSize + 820,
        y: height - 4 * idSize - 680,
        size: idSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF bytes
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);

      // // Create a download link
      // const downloadLink = document.createElement("a");
      // downloadLink.href = URL.createObjectURL(pdfBlob);
      // downloadLink.download = "modified_certificate.pdf";

      // // Append the link to the document and trigger the click event
      // document.body.appendChild(downloadLink);
      // downloadLink.click();

      // // Clean up
      // document.body.removeChild(downloadLink);
      // URL.revokeObjectURL(downloadLink.href);
    }
    createPdf();
    const generateImage = () => {
      const canvasElement = document.createElement("canvas");
      canvasElement.width = 800;
      canvasElement.height = 600;
      const ctx = canvasElement.getContext("2d");

      // Load the image from a URL
      const imageUrl = "https://i.imgur.com/0BZsFWF.png"; // Replace with your image URL
      const img = new Image();
      img.crossOrigin = "anonymous"; // Enable cross-origin access if needed
      img.src = imageUrl;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);

        // Add text overlay
        ctx.font = "36px Times New Roman";
        ctx.fillStyle = "rgb(0, 150, 150)";
        ctx.fillText(data.name, 290, 300); // Adjust the coordinates as needed

        setCanvas(canvasElement);
      };
    };
    generateImage();
  }, [data]);
  const downloadImage = () => {
    if (canvas) {
      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.download = `${data.name}.png`;
      downloadLink.click();
    }
  };
  //   if (!pdfUrl_state) {
  //     return;
  //   }

  //   // Load PDF using pdfjs
  //   const loadingTask = pdfjs.getDocument(pdfUrl_state);
  //   loadingTask.promise.then((pdf) => {
  //     // Fetch the first page
  //     pdf.getPage(1).then((page) => {
  //       const viewport = page.getViewport({ scale: 2 });

  //       // Create a canvas element to render the PDF page as an image
  //       const canvas = document.createElement("canvas");
  //       const context = canvas.getContext("2d");
  //       canvas.width = viewport.width;
  //       canvas.height = viewport.height;

  //       // Render the PDF page as an image on the canvas
  //       const renderContext = {
  //         canvasContext: context,
  //         viewport: viewport,
  //       };
  //       const renderTask = page.render(renderContext);
  //       renderTask.promise.then(() => {
  //         // Convert canvas to data URL and trigger download
  //         const imageDataUrl = canvas.toDataURL("image/png");
  //         const link = document.createElement("a");
  //         link.href = imageDataUrl;
  //         link.download = "certificate.png";
  //         link.click();
  //       });
  //     });
  //   });
  // };

  // const downloadPdfAsPng = async () => {
  //   if (!pdfUrl_state) {
  //     return;
  //   }

  //   const pdfData = await fetch(pdfUrl_state).then((res) => res.arrayBuffer());
  //   const pdfDoc = await PDFDocument.load(pdfData);
  //   const page = pdfDoc.getPage(0); // Assuming you want to capture the first page
  //   // Create a canvas element to render the PDF page
  //   const canvas = document.createElement("canvas");
  //   const context = canvas.getContext("2d");

  //   // Set canvas dimensions to match PDF page
  //   canvas.width = page.getWidth();
  //   canvas.height = page.getHeight();

  //   // Render the PDF page to the canvas
  //   const { width, height } = canvas;
  //   const bitmap = await page
  //     .render({ canvasContext: context, viewport: { width, height } })
  //     .then(() => context);

  //   // Convert canvas to data URL and trigger download
  //   const imageDataUrl = canvas.toDataURL("image/png");
  //   setPngUrl(imageDataUrl);

  //   const link = document.createElement("a");
  //   link.href = imageDataUrl;
  //   link.download = "certificate.png";
  //   link.click();
  // };

  // const createPng = async () => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = 1020;
  //   canvas.height = 741;
  //   const ctx = canvas.getContext("2d");

  //   const pngUrl = "https://i.imgur.com/0BZsFWF.png";
  //   const pngImageBytes = await fetch(pngUrl);
  //   const pngImage = await loadImage(pngImageBytes);

  //   const { width, height } = canvas;

  //   // Draw the PNG image on the canvas
  //   ctx.drawImage(
  //     pngImage,
  //     width / 2 - pngImage.width / 4,
  //     height / 2 - pngImage.height / 4,
  //     pngImage.width / 2,
  //     pngImage.height / 2
  //   );
  //   console.log("test");

  //   // Add text to the canvas
  //   const fontSize = 36;
  //   ctx.font = `${fontSize}px Times Roman`;
  //   ctx.fillStyle = "rgb(0, 0.53, 0.71)";
  //   ctx.fillText(
  //     data.name,
  //     width / 2 - fontSize - 50,
  //     height - 4 * fontSize - 220
  //   );

  //   // Convert canvas to data URL
  //   const pngDataUrl = canvas.toDataURL("image/png");
  //   console.log(pngDataUrl);
  //   const downloadLink = document.createElement("a");
  //   downloadLink.href = pngDataUrl;
  //   downloadLink.download = "modified_certificate.png";
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // };

  // const loadImage = (url) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.onload = () => resolve(img);
  //     img.onerror = (err) => reject(err);
  //     img.src = url;
  //   });
  // };

  // createPng();

  return (
    <div style={{ textAlign: "center", backgroundColor: "darkcyan" }}>
      <h1 style={{ color: "white" }}>Certificate</h1>
      {/* <p>{data.name}</p> */}
      {/* 
      <iframe
        src={pdfUrl_state}
        frameborder="0"
        width="1020px"
        height="741px"
        title="certificate"
      ></iframe> */}

      {canvas && (
        <img src={canvas.toDataURL("image/png")} alt="Certificate Png" />
      )}
      <Container>
        <Button sx={{ m: "2rem" }} onClick={downloadImage} variant="contained">
          Download Png
        </Button>
        <Button
          sx={{ m: "2rem" }}
          component={Link}
          href={pdfUrl_state}
          download={`${data.name}.pdf`}
          variant="contained"
        >
          Download Pdf
        </Button>
        {/* <Link to={`/download_png/${id}`}>Download as PNG</Link> */}
        {/* <a href={`/download_png/${id}`} download="modified.png">Download PNG Image</a> */}
      </Container>
    </div>
  );
};

export default Certificate;
