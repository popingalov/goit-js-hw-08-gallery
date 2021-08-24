const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const btnModalClose = document.querySelector('.lightbox__button');
const imgModalEl = document.querySelector('.lightbox__image');
const panch = document.querySelector('.lightbox__content');

const galleryMarkup = galleryItems
  .map((img, i) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link "
    href=${img.original}
  >
    <img
      class="gallery__image "
      id=${i} 
          src=${img.preview}
      data-source=${img.original}
            alt=${img.description}
    />
  </a>
</li>`;
  })
  .join('');
galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

galleryEl.addEventListener('click', onModalOpen);
btnModalClose.addEventListener('click', onModalClose);
overlay.addEventListener('keydown', closeModalByKey);

const imgOrig = galleryItems.original;

function onModalClose(event) {
  modalEl.classList.remove('is-open');
  imgModalEl.src = '';
  imgModalEl.alt = '';
}
window.addEventListener('keydown', closeModalByKey);
function closeModalByKey(event) {
  if (event.code === 'Escape') {
    onModalClose();
  }
}
let c = 0;

function onModalOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modalEl.classList.toggle('is-open');
  imgModalEl.src = event.target.dataset.source;
  c = Number(event.target.id);
}
window.addEventListener('keydown', slideModalByKey);

const test = document.querySelector(`.galleryEl${c}`);

function slideModalByKey(event) {
  if (event.code === 'ArrowRight') {
    c += 1;
  }
  if (event.code === 'ArrowLeft') {
    c -= 1;
  }
  if (event.keyCode == '38') {
    c -= 3;
  }
  if (event.keyCode == '40') {
    c += 3;
  }
  if (c > galleryItems.length - 1) {
    c = 0;
  }
  if (c < 0) {
    c = galleryItems.length - 1;
  }
  imgModalEl.src = galleryItems[`${c}`].original;
  imgModalEl.alt = galleryItems[`${c}`].description;
}
modalEl.addEventListener('click', e => {
  if (e.x > window.visualViewport.width / 2) {
    c += 1;
  }
  if (e.x < window.visualViewport.width / 2) {
    c -= 1;
  }
  if (c > galleryItems.length - 1) {
    c = 0;
  }
  if (c < 0) {
    c = galleryItems.length - 1;
  }
  imgModalEl.src = galleryItems[`${c}`].original;
  imgModalEl.alt = galleryItems[`${c}`].description;
});
