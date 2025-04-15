
document.addEventListener('DOMContentLoaded', () => {
  const moodButtons = document.querySelectorAll('.mood-selector button');
  const notes = document.getElementById('notes');
  const saveBtn = document.getElementById('saveBtn');
  const savedEntries = document.getElementById('savedEntries');
  const darkModeToggle = document.getElementById('darkModeToggle');

  let currentMood = '';

  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentMood = button.dataset.mood;
      document.body.style.backgroundColor = getMoodColor(currentMood);
    });
  });

  saveBtn.addEventListener('click', () => {
    const moodNote = {
      mood: currentMood,
      note: notes.value,
      date: new Date().toLocaleString()
    };
    saveMood(moodNote);
    displayEntries();
    notes.value = '';
    currentMood = '';
  });

  darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
  });

  function saveMood(entry) {
    let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    entries.push(entry);
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }

  function displayEntries() {
    savedEntries.innerHTML = '';
    const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
    entries.forEach(entry => {
      const div = document.createElement('div');
      div.textContent = `${entry.date} - ${entry.mood.toUpperCase()}: ${entry.note}`;
      savedEntries.appendChild(div);
    });
  }

  function getMoodColor(mood) {
    switch(mood) {
      case 'happy': return '#ffeb3b';
      case 'meh': return '#90a4ae';
      case 'sad': return '#64b5f6';
      case 'angry': return '#ef5350';
      default: return '#f4f4f4';
    }
  }

  displayEntries();
});
