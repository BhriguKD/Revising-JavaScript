import { HomePage } from "./pages/home.js";
import { AboutPage } from "./pages/about.js";
import { ContactPage } from "./pages/contact.js";

const appRoot = document.getElementById('app-root')

const routes = {
  '':HomePage,
  '#home': HomePage,
  '#about': AboutPage,
  '#contact': ContactPage
}

export const router = () => {
  const hash = window.location.hash
  const component = routes[hash] || HomePage

  appRoot.innerHTML = component()
}