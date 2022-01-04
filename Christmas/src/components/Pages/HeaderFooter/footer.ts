import footer from './template.html';
import { Component } from '../../Component';
import { Parent } from '../../../types/types';

export class Footer extends Component{
  constructor() {
    super(footer);
  }
}


// export const Footer:render = {
//   render: async () => {
//     console.log(footer);
//     const view = /* html */ `
//         <footer class="footer">
//             <div class="content has-text-centered">
//                 <div class="rss-block"></div>
//                 <div class="footer-content">2021</div>
//                 <div class="footer-content"><a href="https://github.com/Todd89" target="blink">GitHub:Todd89</a></div>
//             </div>
//         </footer>
//         `;
//     return view;
//   },
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   after_render: async () => {},
// };
//
// export default Footer;