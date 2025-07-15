
const curriculumData = {
  "vpm-en": `Hello!
How are you?
I'm fine, thank you.
What's your name?
My name is Anna.
Nice to meet you!
Where are you from?
I'm from Vietnam.
How old are you?
I'm twelve years old.`
};

document.getElementById("menuBtn").addEventListener("click", () => {
  const id = "vpm-en";
  if (curriculumData[id]) {
    const contentBox = document.getElementById("contentBox");
    contentBox.innerHTML = "";
    const lines = curriculumData[id].split("\n");
    lines.forEach(line => {
      const div = document.createElement("div");
      div.className = "example";
      div.dataset.text = line;
      div.textContent = line;
      div.addEventListener("click", () => {
        const utterance = new SpeechSynthesisUtterance(line);
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      });
      contentBox.appendChild(div);
    });
  }
});
