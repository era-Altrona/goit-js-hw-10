import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = document.querySelector('.input-delay');
const button = document.querySelector('.btn-create');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const selectedBtn = document.querySelector('input[name="state"]:checked');
  const delayedPromise = delay => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedBtn.value === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  };
  delayedPromise(delay)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
      form.reset();
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
      form.reset();
    });
});