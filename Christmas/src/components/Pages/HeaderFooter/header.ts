import Utils from '../../Services/Utils';
import { render } from '../../interface/interface'

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
                <div class="navbar-item-settings" id = "volume-id">
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
                    <div class="toy-call">Игрушки</div>
                </div>
                <div class="search-block">
                  <div class="search">
                    <form>
                      <input type="search" placeholder="Искать">
                      <button type="submit"></button>
                    </form>
                  </div>
                </div>
                </div>
            </nav>
          `;
      return view;
    }
    const view = /* html */ `
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="container">
                <span class="navbar-item-home" id = "toHome-id">
                </span>
                <span class="navbar-item-settings" id = "toSet-id">
                </span>
              </div>
          </nav>
        `;
    return view;
  },
  after_render: async () => {
    if (document.getElementById('toHome-id')) {
      (document.getElementById('toHome-id') as HTMLElement).addEventListener('click', (): string => (location.href = '#/'))
    }
    if (document.getElementById('home-id')) {
      (document.getElementById('home-id') as HTMLElement).addEventListener('click', (): string => (location.href = '#/'));
    }
  },
};

export default Navbar;
