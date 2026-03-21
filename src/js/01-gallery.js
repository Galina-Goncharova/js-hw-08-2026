// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryListEl = document.querySelector('.gallery');

const galleryItemsEls = onCreateEls(galleryItems);

galleryItemsRender(galleryItemsEls);

function onCreateEls(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>`;
    })
    .join('');
}

function galleryItemsRender(galleryItemsEls) {
  galleryListEl.innerHTML = galleryItemsEls;
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  disableRightClick: true,
});
