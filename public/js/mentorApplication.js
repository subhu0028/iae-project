const strategyInput = document.getElementById('strategy');
const whyTextarea = document.getElementById('why');
const strategyCharCount = document.getElementById('strategy-char-count');
const whyCharCount = document.getElementById('why-char-count');

strategyInput.addEventListener('input', updateCharCount);
whyTextarea.addEventListener('input', updateCharCount);

function updateCharCount() {
  const charCount = this.value.length;
  const charCountDisplay = this.id === 'strategy' ? strategyCharCount : whyCharCount;
  charCountDisplay.textContent = `${charCount}/200`;

  if (charCount > 199) {
    charCountDisplay.classList.add('count-error');
    alert('Input cannot exceed 200 characters');
    this.disabled = true;
  } else {
    charCountDisplay.classList.remove('count-error');
    this.disabled = false;
  }
}