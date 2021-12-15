import { render } from '../../interface/interface'

export const Footer:render = {
  render: async () => {
    const view = /* html */ `
        <footer class="footer">
            <div class="content has-text-centered">
                <div class="rss-block"></div>
                <div class="footer-content">2021</div>
                <div class="footer-content"><a href="https://github.com/Todd89" target="blink">GitHub:Todd89</a></div>
            </div>
        </footer>
        `;
    return view;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  after_render: async () => {},
};

export default Footer;