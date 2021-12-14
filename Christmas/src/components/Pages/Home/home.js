
import './home.css'

export let Home = {
  render: async () => {
    return `
            <section class="central-section">
                <div class="buttons-block">
                  <div class="button button-kind game">
                    <p>Помогите бабушке нарядить елку</p>
                  </div>
                  <div class="button button-kind start">
                    <p>Начать</p>
                  </div>
                </div>   
            </section>
        `;
  },
  after_render: async () => {
    // Empty arrays

    if (!localStorage.getItem('answers')) {
      let emptyArrWithAnswers = new Array(24).fill([]);
      // .map(() => new Array(10).fill([]));
      for (let i = 0; i < emptyArrWithAnswers.length; i++) {
        let arr = new Array(10).fill(null);
        emptyArrWithAnswers[i] = arr;
      }
      localStorage.setItem('answers', JSON.stringify(emptyArrWithAnswers));
    }

    localStorage.setItem('count', 0);

    // Go to category

    Array.from(document.getElementsByClassName('button-kind')).forEach((el) => {
      el.addEventListener('click', function (e) {
        if (e.target.className.includes('artists')) {
          localStorage.setItem('kindOfCategory', 'artists');
          location.href = '#/categoriesartist';
        } else if (e.target.className.includes('pictures')) {
          localStorage.setItem('kindOfCategory', 'pictures');
          location.href = '#/categoriespictures';
        }
      });
    });
  },
};

export default Home;