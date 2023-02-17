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
const div = document.getElementById("results");
// Detect code function
const detectCode = () => {
  // Start detecting codes on to the video element
  let canvas = document.createElement("canvas");
  let video = document.getElementById("my-video");

  canvas.width = 1920;
  canvas.height = 1080;

  let ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  let image = canvas.toDataURL("image/jpeg");
  javascriptBarcodeReader({
    /* Image ID || HTML5 Image || HTML5 Canvas || HTML5 Canvas ImageData || Image URL */
    image: image,
    barcode: "ean-13",
    // barcodeType: 'industrial',
    options: {
      // useAdaptiveThreshold: true // for images with sahded portions
      // singlePass: true
    },
  })
    .then((code) => {
      console.log(code);
      div.innerHTML = "Result: " + barcode["rawValue"] + "\nFormat: " + barCode["format"];
    })
    .catch((err) => {
      console.log(err);
      div.innerHTML = err;
    });
};

setInterval(detectCode, 100);
