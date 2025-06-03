// In the name of ALLAH!
// Mahdi Salehi

const formElem = document.getElementById('signupForm');
const usernameInputElem = document.getElementById('name');
const errorMsgElem = document.getElementById('errorMsg');
const backendErrorElem = document.getElementById('backendError');

formElem.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();

  const username = usernameInputElem.value.trim();
  const persianRegex = /^[\u0600-\u06FF\s]+$/;

  if (!persianRegex.test(username)) {
    errorMsgElem.classList.remove('hidden');
    return;
  } else {
    errorMsgElem.classList.add('hidden');
  }

  fetch("/sign-up", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        location.assign(data.redirectUrl);
      } else {
        showBackendError(data.err);
      }
    });
}

function showBackendError(message) {
  backendErrorElem.textContent = message;
  backendErrorElem.classList.remove('opacity-0', 'pointer-events-none');
  
  setTimeout(() => {
    backendErrorElem.classList.add('opacity-0', 'pointer-events-none');
  }, 3000);
}
