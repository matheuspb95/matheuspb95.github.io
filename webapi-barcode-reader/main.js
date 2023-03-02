(() => {
  const result = document.getElementById("result");
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  const width = window.screen.width; // We will scale the photo width to this
  let height = 0; // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  let streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  let video = null;
  let canvas = null;
  let photo = null;
  let startbutton = null;
  let newphotobutton = null;

  function showViewLiveResultButton() {
    if (window.self !== window.top) {
      // Ensure that if our document is in a frame, we get the user
      // to first open it in its own tab or window. Otherwise, it
      // won't be able to request permission for camera access.
      document.querySelector(".contentarea").remove();
      const button = document.createElement("button");
      button.textContent = "View live result of the example code above";
      document.body.append(button);
      button.addEventListener("click", () => window.open(location.href));
      return true;
    }
    return false;
  }

  function startup() {
    if (showViewLiveResultButton()) {
      return;
    }
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbutton = document.getElementById("startbutton");
    newphotobutton = document.getElementById("newphotobutton");

    navigator.mediaDevices
      .getUserMedia({
        // video: {
        //   facingMode: { exact: "environment" },
        // },
        video: true,
        audio: false,
      })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);

          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.

          if (isNaN(height)) {
            height = width / (4 / 3);
          }

          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    startbutton.addEventListener(
      "click",
      (ev) => {
        takepicture();
        ev.preventDefault();
      },
      false
    );

    newphotobutton.addEventListener(
      "click",
      (ev) => {
        document.getElementById("camera").hidden = false;
        document.getElementById("output").hidden = true;
        ev.preventDefault();
      },
      false
    );

    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function formDataOptions() {
    var formData = new FormData();
    // Valid values  are listed  at http://how-to.inliteresearch.com/web-api-barcode-reader/#types
    var types = ""; // e.g. "Code39,Code128"  reads only Code39 and Code128 barcodes
    // Optional.  Other WABR options listed at  http://how-to.inliteresearch.com/web-api-barcode-reader/#Optional-reader-parameters
    var tbr = "";
    var options = "";
    var format = "";
    if (types !== "") formData.append("types", types);
    if (tbr !== "") formData.append("tbr", tbr);
    if (options !== "") formData.append("options", options);
    if (format !== "") formData.append("format", format);
    return formData;
  }

  async function sendImgtoAPI(imgData) {
    result.value = "Sending code to API";
    document.getElementById("camera").hidden = true;
    document.getElementById("output").hidden = false;
    // const res = await fetch(imgData);
    // const blob = await res.blob();
    // const formData = new FormData();
    // const file = new File([blob], "img.jpg", {
    //   type: blob.type,
    // });
    // formData.append("imageFile", file, "file");
    // console.log(formData);

    var formData = formDataOptions();
    formData.append("image", imgData);

    fetch("https://wabr.inliteresearch.com/barcodes", {
      headers: {
        accept: "application/json",
        Authorization: "weggrjukmgh67856ushhgargagawa53",
      },
      body: formData,
      method: "POST",
      mode: "cors",
      credentials: "omit",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["Barcodes"].length > 0) {
          if (data["Barcodes"][0]["Text"]) {
            result.value = data["Barcodes"][0]["Text"];
          } else {
            result.value = "No code found";
          }
        } else {
          result.value = "No code found";
        }
      })
      .catch((e) => console.log(e));
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(
        video,
        width * 0,
        height * 0.0,
        width * 1,
        height * 1,
        // width * 0,
        // height * 0,
        // width * 1,
        // height * 1
      );
      context.beginPath();
      context.rect(0, 0, width * 0.4, height);
      context.fillStyle = "white";
      context.fill();

      context.beginPath();
      context.rect(width * 0.6, 0, width, height);
      context.fillStyle = "white";
      context.fill();

      const data = canvas.toDataURL("image/png");
      sendImgtoAPI(data);
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener("load", startup, false);
})();

const copyCode = () => {
  result.select();
  result.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(result.value);
  showSnackBar("Código copiado: " + result.value);
};

function showSnackBar(textMsg) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";
  x.innerHTML = textMsg;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}