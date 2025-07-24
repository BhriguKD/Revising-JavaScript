const emailInp = document.getElementById('email');
const emailFeedback = document.getElementById('email-feedback');

const passInp = document.getElementById('password');
const reqLen= document.getElementById('req-length');
const reqUpper= document.getElementById('req-uppercase');
const reqNumber = document.getElementById('req-number');
const reqSpcl = document.getElementById('req-special');

const confirmInp = document.getElementById('confirm-password');
const confirmFeedback= document.getElementById('confirm-feedback');

const updateRequirement = (element, isValid) => {
  if(isValid) {
    element.classList.add('text-green-500')
    element.innerHTML = `✓ ${element.innerText.substring(1)}`
  } else {
    element.classList.remove('text-green-500')
    element.innerHTML = `✕ ${element.innerText.substring(1)}`
  }
}


const updateFieldValidation = (input, feedback, msg, isValid) => {
  if(isValid) {
    input.classList.remove('border-red-600')
    input.classList.add('border-green-600')
    feedback.textContent = ''
  } else {
    input.classList.remove('border-green-600')
    input.classList.add('border-red-600')
    feedback.textContent = msg
    feedback.classList.add('text-red-500')
  }
}

const validateEmail = () => {
  const email = emailInp.value
  const emailRegex = /.+@.+\..+/
  const isValid = emailRegex.test(email)
  updateFieldValidation(emailInp, emailFeedback, 'Please enter a valid email address.', isValid)
}

const validatePassword = () => {
  const pass = passInp.value
  const hasLength = pass.length >= 8
  const hasUppercase = /[A-Z]/.test(pass)
  const hasNumber = /\d/.test(pass)
  const hasSpecial = /[!@#$%^&*()]/.test(pass)

  updateRequirement(reqLen, hasLength)
  updateRequirement(reqUpper, hasUppercase)
  updateRequirement(reqNumber, hasNumber)
  updateRequirement(reqSpcl, hasSpecial)
}

const validatConfirmPassword = () => {
  const pass = passInp.value
  const confirmPass = confirmInp.value
  const isValid = (pass === confirmPass) && (confirmPass.length > 0)
  updateFieldValidation(confirmInp, confirmFeedback, 'Passwords do not match.', isValid)
}

emailInp.addEventListener('input', validateEmail)
passInp.addEventListener('input', ()=>{
  validatePassword()
  validatConfirmPassword()
})

confirmInp.addEventListener('input', validatConfirmPassword)