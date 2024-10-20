
//TODO rename value-1 etc
const lightModeRadio  = document.getElementById('value-1');
const darkModeRadio   = document.getElementById('value-2');
const hackerModeRadio = document.getElementById('value-3');

//Function to apply the appropriate mode class
/*
function applyMode(mode) {
  document.body.classList.remove('light-mode', 'dark-mode', 'hacker-mode');

  if (mode === 'light') {
    document.body.classList.add('light-mode');
  } else if (mode === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (mode === 'hacker') {
    document.body.classList.add('hacker-mode');
  }
}
  */

window.onload = (event) =>{
    document.documentElement.setAttribute('data-theme', 'dark');
};

lightModeRadio.addEventListener('change', () => {
  if (lightModeRadio.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
});

darkModeRadio.addEventListener('change', () => {
  if (darkModeRadio.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});

hackerModeRadio.addEventListener('change', () => {
  if (hackerModeRadio.checked) {
    document.documentElement.setAttribute('data-theme', 'hacker');
    //applyMode(light)
  }
});
