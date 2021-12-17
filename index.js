(function () {
  const audioPlayer = document.querySelector("#player");
  let fieldData = "";
  let soundVolume = "";
  let sound = "";
  let userName = "";
  let command = "";
  let timeStamp = 0;

  function playSound() {
    audioPlayer.play();
  }

  function startSound() {
    console.log("started");
    const currentTime = new Date().getTime();

    if (timeStamp === 0) {
      console.log(timeStamp);
      timeStamp = new Date().getTime();
      playSound();
    }

    console.log(currentTime - timeStamp);
    console.log(currentTime - timeStamp >= 1000 * 30);

    if (currentTime - timeStamp >= 1000 * 30) {
      console.log("sound started");
      playSound();
    } else {
      return;
    }
  }

  audioPlayer.addEventListener(
    "loadedmetadata",
    function () {
      soundDuration = audioPlayer.duration;
    },
    false
  );

  window.addEventListener("onWidgetLoad", function (obj) {
    fieldData = obj["detail"]["fieldData"];
    soundVolume = fieldData["soundVolume"];
    sound = fieldData["sound"];
    userName = fieldData["username"];
    command = fieldData["command"];

    audioPlayer.volume = soundVolume / 100;
  });

  window.addEventListener("onEventReceived", function (obj) {
    const data = obj["detail"]["event"]["data"];
    console.log(data);

    if (data.displayName === userName && data.text.includes(command)) {
      startSound();
    } else {
      return;
    }
  });
})();
