window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});
const scriptUrl = 'https://script.google.com/macros/s/AKfycbxQEK_iHEX3gNY1ykRtjGaGAIPss9xNknOJifHUBhMWjnxhGqt_63XvYJoExI3slkl0eg/exec'
let SHEET_ID = '1xzPyPP96FNmJwZKjxrElvftZad8cgkmIUDTywYBI-JE';
let SHEET_TITLE = 'form data';
let SHEET_RANGE = 'A2:C1000';
let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);
const form = document.forms['contact-form']
fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    const targetNumber = data.table.rows.length;
    form.addEventListener('submit', e => {
      e.preventDefault()
      for (let i = 0; i < targetNumber; i++){
        if(document.getElementById("english").value == data.table.rows[i].c[0].v){
          bsAlert2.show();   
          // location.replace("index.html")
          document.getElementById("english").value = '';
      document.getElementById("karakalpak").value = '';
          setTimeout(() => {window.location.reload();}, 1500); 
        }
      }
      if (document.getElementById("english").value != ''){
        fetch(scriptUrl, { method: 'POST', body: new FormData(form)})
        .then(response => bsAlert.show())
        .then(() => { setTimeout(() => {window.location.reload();}, 1500); })
        .catch(error => console.error('error!', error.message));
      }
  })
    const duration = 500;
    counterUpAnimation(targetNumber, duration);
})
let myAlert = document.querySelector('.toast');
let bsAlert = new bootstrap.Toast(myAlert);
let myAlert2 = document.querySelector('.error');
let bsAlert2 = new bootstrap.Toast(myAlert2);
function focusOnInput(){
    document.forms['contact-form']['english'].focus();
}
// counter animation
function counterUpAnimation(targetNumber, duration) {
    const element = document.getElementById('counter');
    const startNumber = parseInt(element.innerText);
    const increment = Math.ceil((targetNumber - startNumber) / (duration / 16)); // 16ms per frame (roughly 60 frames per second)

    function updateCounter() {
      const currentValue = parseInt(element.innerText);
      if (currentValue < targetNumber) {
        element.innerText = Math.min(currentValue + increment, targetNumber);
        requestAnimationFrame(updateCounter);
      }
    }
    updateCounter();
  }
    //Change theme
  var icon = document.getElementById("chngColor");
  icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    let n = localStorage.getItem('n') || 0;
    n = 0;
    if(document.body.classList.contains("dark-theme")){
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      document.getElementById("okBtn").classList.remove("btn-primary");
      document.getElementById("okBtn").classList.add("btn-secondary");
      n = n + 1;
      localStorage.setItem('n', n);
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      document.getElementById("okBtn").classList.remove("btn-secondary");
      document.getElementById("okBtn").classList.add("btn-primary");
      n = 0;
      localStorage.setItem('n', n);
    }

  }
  window.onload = function () {
    if (localStorage.getItem('n') == 1){
      document.body.classList.toggle("dark-theme");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      document.getElementById("okBtn").classList.remove("btn-primary");
      document.getElementById("okBtn").classList.add("btn-secondary");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      document.getElementById("okBtn").classList.remove("btn-secondary");
      document.getElementById("okBtn").classList.add("btn-primary");
    }
}