
import './home.css';
// import { render } from '../../interfaces/interface';

export const Home = {
  render: async () => {
    return `
            <section class="central-section">
                <div class="buttons-block">
                  <div class="game">
                    <p>Помогите бабушке нарядить елку</p>
                  </div>
                  <div class="button start">
                    <p>Начать</p>
                  </div>
                </div>   
            </section>
        `;
  },
  after_render: async () => {
  (document.querySelector('.start') as HTMLElement).addEventListener('click', ():string => location.href = '#/toys');
  },
};

export default Home;