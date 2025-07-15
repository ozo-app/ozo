
document.addEventListener("DOMContentLoaded", () => {
  const replayBtn = document.getElementById("replay");
  const micBtn = document.getElementById("mic");
  const saveBtn = document.getElementById("save");

  let mediaRecorder;
  let audioChunks = [];
  let audioBlob = null;

  // 🔁 Replay = phát lại bản ghi âm
  replayBtn.addEventListener("click", () => {
    if (!audioBlob) {
      alert("Bạn cần ghi âm trước khi phát lại.");
      return;
    }
    const audioURL = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);
    audio.play();
  });

  // 🎤 Ghi âm
  micBtn.addEventListener("click", async () => {
    if (micBtn.textContent === "🎤") {
      micBtn.textContent = "🔴";
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);
        audio.play();
      };

      mediaRecorder.start();
    } else {
      micBtn.textContent = "🎤";
      mediaRecorder.stop();
    }
  });

  // 💾 Lưu file
  saveBtn.addEventListener("click", () => {
    if (!audioBlob) {
      alert("Bạn cần ghi âm trước khi lưu!");
      return;
    }
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ghi-am.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    saveBtn.textContent = "✅";
    setTimeout(() => {
      saveBtn.textContent = "💾";
    }, 1000);
  });

  // 📘 Click vào câu trong contentBox
  document.querySelectorAll(".example").forEach((el) => {
    el.addEventListener("click", () => {
      const text = el.dataset.text;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    });
  });

  // ☰ Menu mở thư viện
  document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementById("library").classList.remove("hidden");
  });

  // ⬅️ Quay lại
  document.getElementById("backBtn").addEventListener("click", () => {
    document.getElementById("library").classList.add("hidden");
  });

  // 📘 Tải giáo trình
  const curriculumData = {
    "vpm-en": "Hello! How are you today?\nI'm fine, thank you. And you?"
  };
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("download-btn")) {
      const item = e.target.parentElement;
      const id = e.target.dataset.id;
      const downloadedList = document.getElementById("downloadedList");
      item.removeChild(e.target);
      downloadedList.appendChild(item);
      if (curriculumData[id]) {
        alert("Đã tải và nạp nội dung giáo trình vào màn hình học.");
      }
    }
  });
});
