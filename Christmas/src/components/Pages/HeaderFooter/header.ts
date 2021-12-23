import Utils from '../../Services/Utils';
import { render } from '../../interface/interface';


const Navbar: render = {
  render: async () => {
    const request = Utils.parseRequestURL();
    const parsedURL =
      (request.resource ? `/${request.resource}` : '/') +
      (request.id ? '/:id' : '') +
      (request.verb ? `/${request.verb}` : '');
    if (parsedURL == '/') {
      const view = /* html */ `
          <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="container">
                </div>
                </div>
            </nav>
          `;
      return view;
    }
    if (parsedURL == '/toys') {
      const view = /* html */ `
          <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="container nav-container">
                <div class="info-block">
                  <div class="navbar-item-settings" id = "volume-id">
                    </div>
                    <div class="navbar-item-settings" id = "home-id">
                    </div>
                    <div class="toy-call" id="tree-id">Нарядить ёлку</div>
                </div>
                <div class="search-block">
                  <div class="search">
                    <form id="form">
                      <input id="search" type="search" placeholder="Искать" autocomplete="off">
                      <button type="submit"></button>
                    </form>
                  </div>
                  <div class="favorites"></div>
                </div>
                </div>
            </nav>
          `;
      return view;
    } if (parsedURL == '/tree') {
      const view = /* html */ `
          <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="container nav-container">
                <div class="info-block">
                    <div class="navbar-item-settings" id="home-id"></div>
                    <div class="toy-call" id="toys-id">Игрушки</div>
                </div>
              </div>
            </nav>
          `;
      return view;
    }
    return "view";
  },
  after_render: async () => {
    const trueSound = new Audio('../../../src/Assets/audio/audio.mp3');
     
    if (document.getElementById('volume-id')) {
      (document.getElementById('volume-id') as HTMLElement).addEventListener('click', () => {
        if (trueSound.paused) {
          trueSound.play();
          trueSound.loop;
        } else {
          trueSound.pause();
        }
      })
    }
   
    if (document.getElementById('home-id')) {
      (document.getElementById('home-id') as HTMLElement).addEventListener('click', (): string => (location.href = '#/'))
    }
    if (document.getElementById('tree-id')) {
      (document.getElementById('tree-id') as HTMLElement).addEventListener('click', (): string => (location.href = '#/tree'));
    }
    if (document.getElementById('toys-id')) {
      (document.getElementById('toys-id') as HTMLElement).addEventListener('click', (): string => (location.href = '#/toys'));
    }

  },
};

export default Navbar;
