import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function createPdf(studentDetails, course) {
  console.log("course ", course);
  const pngUrl = "https://i.imgur.com/iGLFQZo.png";

  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const page = pdfDoc.addPage([1000, 770]);
  const { width, height } = page.getSize();
  const fontSize = 36;

  const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());

  const pngImage = await pdfDoc.embedPng(pngImageBytes);

  const pngDims = pngImage.scale(0.5);

  page.drawImage(pngImage, {
    x: page.getWidth() / 2 - pngDims.width / 2,
    y: page.getHeight() / 2 - pngDims.height + 385,
    width: pngDims.width,
    height: pngDims.height,
  });
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const currentDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const formattedStartDate = formatDate(course.batchstart);
  const formattedEndDate = formatDate(course.batchend);

  const firstName =
    studentDetails.firstName.charAt(0).toUpperCase() +
    studentDetails.firstName.slice(1);
  const lastName =
    studentDetails.lastName.charAt(0).toUpperCase() +
    studentDetails.lastName.slice(1);
  const name = firstName + " " + lastName;
  const nameWidth = timesBoldFont.widthOfTextAtSize(name, fontSize);
  const centerX = (width - nameWidth) / 2;
  const centerY = 390; // Set the desired y position for the name

  page.drawText(name, {
    x: centerX,
    y: centerY,
    size: fontSize,
    font: timesBoldFont,
    color: rgb(0, 0, 0),
  });

  // Center text without additional values
  const centerText = (text, font, size, color, yOffset = 1) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    const x = (width - textWidth) / 2;
    const y = 220 + yOffset;
    page.drawText(text, { x, y, size, font, color });
  };

  const certificatetext = [
    `In testimony thereof, this certificate is awarded on the ${currentDate()}.`,
    `for successful completion of the training.`,
    `Her performance has been satisfactory so as to fulfill the requirements`,
    `at Wisdom Sprouts - It Training Hub, Pune. from “${formattedStartDate}“ to “${formattedEndDate}“`,
    `For successfully completing the “${course.name}“ Course`,
  ];

  const lineHeight = 30;
  certificatetext.forEach((line, index) => {
    centerText(line, timesRomanFont, 24, rgb(0, 0, 0), index * lineHeight);
  });

  // const courseSize = 18;
  // page.drawText(course.name, {
  //   x: width / 2 - courseSize - 50,
  //   y: height - 4 * courseSize - 368,
  //   size: courseSize,
  //   font: timesRomanFont,
  //   color: rgb(1, 0, 0),
  // });
  const dateSize = 18;
  // page.drawText(" 2ND JANUARY TO 31ST MARCH ", {
  //   x: dateSize + 550,
  //   y: height - 4 * dateSize - 405,
  //   size: dateSize,
  //   font: timesRomanFont,
  //   color: rgb(0, 0, 0),
  // });
  // const endDateSize = 18;
  // page.drawText("31 ST OF MARCH, 2023 ", {
  //   x: endDateSize + 675,
  //   y: height - 4 * endDateSize - 510,
  //   size: endDateSize,
  //   font: timesRomanFont,
  //   color: rgb(0, 0, 0),
  // });
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
  return pdfUrl;

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
