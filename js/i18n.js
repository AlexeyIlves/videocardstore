const languageSwitcher =
  document.getElementById(
    'languageSwitcher'
  );

function setLanguage(lang){

  localStorage.setItem(
    'language',
    lang
  );

  document
    .querySelectorAll('[data-i18n]')
    .forEach(element => {

      const key =
        element.dataset.i18n;

      element.textContent =
        translations[lang][key];
    });
}

const savedLanguage =
  localStorage.getItem('language')
  || 'ru';

setLanguage(savedLanguage);

languageSwitcher.value =
  savedLanguage;

languageSwitcher.addEventListener(
  'change',
  e => {

    setLanguage(e.target.value);
  }
);