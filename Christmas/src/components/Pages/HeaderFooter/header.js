import Utils from '../../Services/Utils'

const Navbar = {
  render: async () => {
    const request = Utils.parseRequestURL();
    const parsedURL =
      (request.resource ? `/${request.resource}` : '/') +
      (request.id ? '/:id' : '') +
      (request.verb ? `/${request.verb}` : '');
    if (parsedURL == '/') {
      let view = /* html */ `
          <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="container">
                  <span class="navbar-item-settings" id = "toSet-id">
                  </span>
                </div>
            </nav>
          `;
      return view;
    }
    if (parsedURL == '/settings') {
      let view = /* html */ `
          <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="container">
                  <span class="navbar-item-home"  id = "toHome-id">
                  </span>
                </div>
            </nav>
          `;
      return view;
    }
    let view = /* html */ `
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
      document
        .getElementById('toHome-id')
        .addEventListener('click', () => (location.href = '#/'));
    }
    if (document.getElementById('toSet-id')) {
      document
        .getElementById('toSet-id')
        .addEventListener('click', () => (location.href = '#/settings'));
    }
  },
};

export default Navbar;