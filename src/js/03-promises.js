import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
  }
    }, delay)
  })

    return promise;
}

formEl.addEventListener('submit', event => {
  event.preventDefault();
  let amountOfDealys = Number(inputDelayEl.value);
  let amountOfSteps = Number(inputStepEl.value);

  for (let i = 0; i < inputAmountEl.value; i += 1) {
    createPromise(i + 1, amountOfDealys + i * amountOfSteps)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  };
});