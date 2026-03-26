import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEmailEl = formEl.querySelector('[name="email"]');
const inputMessageEl = formEl.querySelector('[name="message"]');
const FORM_DATA_KEY = 'feedback-form-state';
let inputDataObject = { email: '', message: '' };

document.addEventListener('DOMContentLoaded', onGetSavedData);

formEl.addEventListener('input', throttle(onSaveInputData, 500));

formEl.addEventListener('submit', onFormReset);

function onSaveInputData(e) {
  const key = e.target;
  inputDataObject[key.name] = key.value;
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(inputDataObject));
}

function onGetSavedData() {
  const savedData = JSON.parse(localStorage.getItem(FORM_DATA_KEY)) || {};
  if (savedData) {
    inputEmailEl.value = savedData.email || '';
    inputMessageEl.value = savedData.message || '';
  }
  inputDataObject = savedData;
}

function onFormReset(e) {
  e.preventDefault();
  console.log(inputDataObject);
  localStorage.removeItem(FORM_DATA_KEY);
  inputDataObject = {};
  e.currentTarget.reset();
}
