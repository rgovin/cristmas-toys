import './tree.css';
import { render } from '../../interface/interface';
import { data } from '../../../data';
import { toy } from "../../interface/interface";
import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';

export const Tree: render = {
  render: async () => {
    return `
            <section class="central-section"> 
             
            </section>
        `;
  },
  after_render: async () => {
    console
  }
}
export default Tree;