function generateQRCode() {
  const inputs = document.querySelectorAll("#form-fields input");
  let data = "";

  inputs.forEach((input) => {
    if (input.value) {
      data += `${input.placeholder}: ${input.value}\n`;
    }
  });

  if (!data) {
    alert("Please fill out at least one field.");
    return;
  }

  const color = document.getElementById("color").value;
  const size = parseInt(document.getElementById("size").value, 10);
  const errorCorrectionLevel = document.getElementById(
    "errorCorrectionLevel"
  ).value;

  const qrcodeDiv = document.getElementById("qrcode");
  qrcodeDiv.innerHTML = "";

  const canvas = document.createElement("canvas");
  qrcodeDiv.appendChild(canvas);

  QRCode.toCanvas(
    canvas,
    data.trim(),
    {
      width: size,
      height: size,
      color: {
        dark: color || "#000000",
        light: "#ffffff",
      },
      errorCorrectionLevel: errorCorrectionLevel,
    },
    function (error) {
      if (error) {
        console.error(error);
        alert("Error generating QR code.");
      } else {
        console.log("QR code generated and added to the page");
        addDownloadButton(canvas);
      }
    }
  );
}

function addDownloadButton(canvas) {
  const existingBtn = document.getElementById("downloadBtn");
  if (existingBtn) {
    existingBtn.remove();
  }

  const downloadBtn = document.createElement("button");
  downloadBtn.id = "downloadBtn";
  downloadBtn.textContent = "Download QR Code";
  downloadBtn.onclick = function () {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL();
    link.click();
  };
  document.getElementById("qrcode").appendChild(downloadBtn);
}

function addField() {
  const placeholder = prompt("What value does this field hold?");
  if (!placeholder) {
    alert("Field placeholder cannot be empty.");
    return;
  }

  const formFields = document.getElementById("form-fields");
  const fieldGroup = document.createElement("div");
  fieldGroup.className = "field-group";

  const newField = document.createElement("input");
  newField.type = "text";
  newField.placeholder = placeholder;
  newField.className = "dynamic-field";
  newField.required = true;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "−";
  removeBtn.onclick = function () {
    removeField(removeBtn);
  };

  fieldGroup.appendChild(newField);
  fieldGroup.appendChild(removeBtn);

  formFields.appendChild(fieldGroup);
}

function removeField(button) {
  const fieldGroup = button.parentNode;
  fieldGroup.parentNode.removeChild(fieldGroup);
}
