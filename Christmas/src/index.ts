type routes = {
  [name:string]: {
    render: () => Promise<string>;
    after_render: () => Promise<void>;
};
}

import { Home } from './components/Pages/Home/home.js';
// import Settings from './pages/Set/Settings.js';
// import CategoriesArt from './pages/CategiriesArts/CategoriesArt.js';
// import CategoriesPic from './pages/CategoriesPics/CategoriesPics.js';
// import Quastion from './pages/Quastion/Quastion.js';
// import Results from './pages/Results/results.js';
import Error404 from './components/Pages/error404.js';

import Navbar from './components/Pages/HeaderFooter/header';
import Footer from './components/Pages/HeaderFooter/footer';

import Utils from './components/Services/Utils';

import './global.css';

// List of supported routes. Any url other than these routes will throw a 404 error
export const routes:routes = {
  '/': Home,
  // '/categoriesartist': CategoriesArt,
  // '/categoriespictures': CategoriesPic,
  // '/quastion': Quastion,
  // '/settings': Settings,
  // '/results': Results,
};

// The router code.
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById('header_container') as HTMLElement;
  const content = null || document.getElementById('page_container') as HTMLElement;
  const footer = null || document.getElementById('footer_container') as HTMLElement;

  // Render the Header and footer of the page
  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  // Get the parsed URl from the addressbar
  const request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  const parsedURL =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  const page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();

  // catergoryList.map(item => {
  //   return item.style.background = `url('../../data/img/0.jpg) no-repeat 0 0/ cover fixed`
  //   consile.log(item)
  // })

  const htmlHome = document.getElementsByTagName('html');

  if (parsedURL === '/') {
    htmlHome[0].style.removeProperty('background');
    htmlHome[0].style.background = "";
  } else {
    htmlHome[0].style.removeProperty('background');
    htmlHome[0].style.background = 'black';
  }
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);