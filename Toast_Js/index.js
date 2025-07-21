const showToast = (message, type="success") => {
  const toastContainer = document.getElementById("toast-container");
const toast = document.createElement("div");
toast.classList.add("toast");
if( type === "error") toast.classList.add("error");
toast.innerText = message;

toastContainer.appendChild(toast);
setTimeout(()=> {
  toast.style.animation = "fadeOut 0.5s forwards";
  setTimeout(()=> toast.remove(), 500);
}, 3000);
}