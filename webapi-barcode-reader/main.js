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
        video: {
          facingMode: { ideal: "environment" },
        },
        // video: true,
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
        inputElement.value = null;
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
    result.innerHTML = "Sending code to API";
    document.getElementById("camera").hidden = true;
    document.getElementById("output").hidden = false;

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
            result.innerHTML = data["Barcodes"][0]["Text"];
          } else {
            result.innerHTML = "No code found";
          }
        } else {
          result.innerHTML = "No code found";
        }
      })
      .catch((e) => console.log(e));
  }

  async function sendImgtoAPI_2(imgData) {
    fetch(imgData)
      .then((res) => res.blob())
      .then((blob) => {
        const fd = new FormData();
        const file = new File([blob], "filename.jpeg");
        fd.append("image", file);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append(
          "Cookie",
          "AWSALB=nc6fqskcK03/4P/jcyGD4W/f7LL3drKCZUJSO21dOWKUPmrp8R6qeNhc70hs04Cio5l3j47jEr++NS2U72jqJAB4ODI7qlWZd+nZCkXYDnlrm7UBnW/2YRsKPUsy; AWSALBCORS=nc6fqskcK03/4P/jcyGD4W/f7LL3drKCZUJSO21dOWKUPmrp8R6qeNhc70hs04Cio5l3j47jEr++NS2U72jqJAB4ODI7qlWZd+nZCkXYDnlrm7UBnW/2YRsKPUsy"
        );

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        urlencoded.append("client_id", "cdccab7e-8f00-4ea7-a345-7a76c08c383d");
        urlencoded.append("client_secret", "b3680ccc4dcc14abf514eb72792846d4");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        fetch("https://api.aspose.cloud/connect/token", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);

            var token = result["access_token"];

            fetch("https://api.aspose.cloud/v3.0/barcode/recognize", {
              headers: {
                accept: "application/json",
                "accept-language": "en-US,en;q=0.9",
                authorization: "Bearer " + token,
              },
              body: fd,
              method: "POST",
              mode: "cors",
            }).then((res) => console.log(res));
          })
          .catch((error) => console.log("error", error));
      });
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
      context.drawImage(video, width * 0, height * 0.0, width * 1, height * 1);
      context.beginPath();
      context.rect(0, 0, width * 0.4, height);
      context.fillStyle = "white";
      context.fill();

      context.beginPath();
      context.rect(width * 0.6, 0, width, height);
      context.fillStyle = "white";
      context.fill();

      context.imageSmoothingEnabled = false;

      context.globalCompositeOperation = "saturation";
      context.fillStyle = "black";
      context.globalAlpha = 2; // alpha 0 = no effect 1 = full effect
      context.fillRect(0, 0, canvas.width, canvas.height);
      // context.filter = "saturate(5)"

      const data = canvas.toDataURL("image/png");
      sendImgtoAPI_2(data);
      photo.setAttribute("src", data);
    } else {
      clearphoto();
    }
  }

  const inputElement = document.getElementById("myfile");

  inputElement.addEventListener(
    "change",
    (ev) => {
      let file = ev.target.files[0];
      // console.log(file);

      photo.src = URL.createObjectURL(file);

      result.innerHTML = "Sending code to API";
      document.getElementById("camera").hidden = true;
      document.getElementById("output").hidden = false;
      var formData = formDataOptions();
      formData.append("file[]", file, file.name);

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
              result.innerHTML = data["Barcodes"][0]["Text"];
            } else {
              result.innerHTML = "No code found";
            }
          } else {
            result.innerHTML = "No code found";
          }
        })
        .catch((e) => console.log(e));
    },
    false
  );

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener("load", startup, false);
})();

const copyCode = () => {
  result.select();
  result.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(result.innerHTML);
  showSnackBar("Código copiado: " + result.innerHTML);
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
