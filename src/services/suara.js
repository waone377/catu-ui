function speech(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";

  utterance.rate = 1.2;
  utterance.pitch = 1.3;
  speechSynthesis.speak(utterance);
}
export default speech;
