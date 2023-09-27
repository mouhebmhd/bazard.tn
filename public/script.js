var info = {};
var stopRecording = false;

function generateRandomId() {
  const idLength = 8;
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomId = "";
  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }
  return randomId;
}

function generateRandomName() {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

function generateRandomInfo() {
  const randomId = generateRandomId();
  const randomName = generateRandomName();
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  info = {
    id: randomId,
    name: randomName,
    date: currentDate,
    time: currentTime,
  };
  return info;
}

// Call the function to generate and display random information

var events = []; // To store captured events
var frames=[]
window.addEventListener("load", () => {
  FstartRecording();
});


function FstartRecording() {
  info = generateRandomInfo();
  events.length = 0; // Clear previous events
  stopRecording = false;
  // Start capturing events
  rrweb.record({
    emit(event) {
      if (!stopRecording) {
        events.push(event);
      }
    },
  });
}
function FstopRecording() {
  info.finishTime = new Date().toLocaleTimeString();
  stopRecording = true; // Stop capturing events

  sendPostRequest(events, info);
}


function sendPostRequest(eventsArray, info) {
  console.log('post request')
  const url = "http://localhost:3030/events/";
  $.ajax({
    url: url,
    method: "POST",
    data: { events: eventsArray, info }, // Wrap the array in an object
  }).done(function (response) {
    console.log("it works");
  });
}


function FreplayRecording() {
  FstopRecording();

  const replayer = new rrweb.Replayer(events, {});

  replayer.play();

  const screenshotInterval = 1000; // Set the interval in milliseconds
  let currentTime = 0;

  function takeScreenshot() {
    const screenshotDiv = document.querySelector('.replayer-wrapper');

    // Use a third-party library to capture the div's content and convert to an image
    // For example, you can use html2canvas or dom-to-image library
    // Example using html2canvas:
    html2canvas(screenshotDiv).then(canvas => {
      // Convert canvas to image and do something with it
      const image = new Image();
      image.src = canvas.toDataURL('image/png');
      console.log(image);
      document.body.appendChild(image); // Display the image on the page
    });

    currentTime += screenshotInterval;

    if (currentTime <= replayer.getMetaData().totalTime) {
      setTimeout(takeScreenshot, screenshotInterval);
    }
  }

  // Delay the initial screenshot capture to allow for rendering
  setTimeout(() => {
    takeScreenshot();
  }, 2000); // Adjust the delay as needed
}





