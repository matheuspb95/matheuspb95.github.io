const codeValue = document.getElementById("codvalue");

// Get the video element
const video = document.querySelector("#video");
// Check if device has camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Use video without audio
  const constraints = {
    video: {
      facingMode: { exact: "environment" },
    },
    audio: false,
  };

  // Start video stream
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => (video.srcObject = stream));
}

let formats;
// Save all formats to formats var
BarcodeDetector.getSupportedFormats().then((arr) => (formats = arr));
// Create new barcode detector with all supported formats
const barcodeDetector = new BarcodeDetector({ formats });
// const barcodeDetector = new BarcodeDetector("itf");
// Detect code function
const detectCode = () => {
  // Start detecting codes on to the video element
  barcodeDetector
    .detect(video)
    .then((codes) => {
      // If no codes exit function
      if (codes.length === 0) return;

      for (const barcode of codes) {
        // Log the barcode to the console
        console.log(barcode);
        if (barcode["rawValue"].length == 44) {
          codeValue.value = barcode["rawValue"];
        }
      }
    })
    .catch((err) => {
      // Log an error if one happens
      console.error(err);
    });
};

setInterval(detectCode, 100);

function showSnackBar(textMsg) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";
  x.innerHTML = textMsg;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

const copyCode = () => {
  codeValue.select();
  codeValue.setSelectionRange(0, 99999); // For mobile devices
  
   // Copy the text inside the text field
  navigator.clipboard.writeText(codeValue.value);
  showSnackBar("Código copiado: " + codeValue.value);
}
