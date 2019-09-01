"use strict";
import galleryAll from "./gallery-items.js";

//создаю рефс для переменных в которых будут жить ссылки на элементы Дома
const refs = {
  ulGallery: document.querySelector(".gallery"), //UL
  modalWindows: document.querySelector(".lightbox"), // модалка
  modalWindowsOverlay: document.querySelector(".lightbox__overlay"), // оверлей модалки
  bigImg: document.querySelector(".lightbox___image"), // картинка в модалке
  buttonModal: document.querySelector('button[data-action="close-lightbox"]') // кнопка в модал
};

//функция для добавления новой картинки в ДОМ
function addImageInDOM(imageNew) {
  refs.ulGallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${imageNew.original}"
    >
      <img
        class="gallery__image"
       
        src="${imageNew.preview}"
        data-source="${imageNew.original}"
        alt="${imageNew.description}"
      />
    
      <span class="gallery__icon">
        <i class="material-icons">zoom_out_map</i>
      </span>
    </a>
    </li>`
  );
}

// перебираю все каритинки с массива и посылаю в функцию которую создал для поселения в ДОМ

galleryAll.forEach((imageNew, index) => addImageInDOM(imageNew, index));

// включаю слушатель события на UL и тут же задаю функцию для
// обработки этого события

refs.ulGallery.addEventListener("click", openModalWindow);

function openModalWindow(event) {
  event.preventDefault(); // отключаю стандартную операцию при клике на ссылку (что бы не открывалось в новом окне)

  // так как делигирую событие на УЛ то проверяю или не нажато на само УЛ и если нажато то выходим с функции
  if (event.target === event.currentTarget) {
    return;
  }

  // переманная в которой живет значение ДАТА-СОУРС кликнутой картинки
  const selectImage = event.target.dataset.source; //pointer-events: //none;

  //   console.log(event);
  // назначаю ИМГ.СРЦ модального окна равному ссылке кликнутой картинки
  refs.bigImg.src = `${selectImage}`;

  // самое время вывести модальное окно с большой картинкой
  refs.modalWindows.classList.add("is-open");

  // создаю слушателя события клика всего ДИВ (делигирую на ДИВ все нажатия)
  refs.modalWindows.addEventListener("click", hadleClikOverlay);
  // Слушатель на кнопку
  refs.buttonModal.addEventListener("click", closeModalWindow);
  // слушатель на клавиатуру
  window.addEventListener("keydown", hadleClikEscape);
}

/// Обработчики событий
function hadleClikOverlay(event) {
  // если нажали не на картинке то обратиться к закрыванию модалки
  if (event.target !== refs.bigImg) {
    closeModalWindow(event);
  }
}

function hadleClikEscape(event) {
  // если нажали не Ескейп то закрыть окно в противном случае (значит нажали Ескейп) вызываем закрывалку модалки
  if (event.code !== "Escape") {
    return;
  }
  closeModalWindow(event);
}

// Функция закрытия модального окна
function closeModalWindow(event) {
  refs.modalWindows.classList.remove("is-open"); // снимаю класс отображалки модального окна
  refs.bigImg.src = ""; // это обнуляю картинку что бы не блымала перед загрузкой следующей

  // снимаю слушателей с кнопки, клавиатуры и модального окна что бы пока нету окна что бы не висел лишний обработчик
  refs.modalWindows.removeEventListener("click", closeModalWindow);
  refs.buttonModal.removeEventListener("click", closeModalWindow);
  window.removeEventListener("keydown", closeModalWindow);
}
