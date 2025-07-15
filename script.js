
const contentBox = document.getElementById("contentBox");

document.getElementById("menuBtn").addEventListener("click", () => {
  const lines = [
    "Hello!",
    "How are you?",
    "I'm fine, thank you.",
    "What's your name?",
    "My name is Anna.",
    "Nice to meet you!",
    "Where are you from?",
    "I'm from Vietnam.",
    "How old are you?",
    "I'm twelve years old."
  ];
  contentBox.innerHTML = "";
  lines.forEach(line => {
    const div = document.createElement("div");
    div.className = "example";
    div.textContent = line;
    div.addEventListener("click", () => {
      const utter = new SpeechSynthesisUtterance(line);
      utter.lang = "en-US";
      utter.rate = 0.9;
      speechSynthesis.speak(utter);
    });
    contentBox.appendChild(div);
  });
});
