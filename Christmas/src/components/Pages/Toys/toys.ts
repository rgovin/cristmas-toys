import './toys.css';
import { render } from '../../interface/interface';
import { data } from '../../../data'

export const Toys: render = {
  render: async () => {
    return `
            <section class="central-section-toys">
              <div class="set">
                <div class="filter value-filter">
                  <form>
                    <fieldset>
                      <legend>Фильтры по значению</legend>
                      <div class="form-container"><span class="col-word">Форма:</span>
                        <label><input type="checkbox" value="bell" name="form"><span class="bell-image"></span></label>
                        <label><input type="checkbox" value="ball" name="form"><span class="ball-image"></span></label>
                        <label><input type="checkbox" value="pine" name="form"><span class="pine-image"></span></label>
                        <label><input type="checkbox" value="star" name="form"><span class="star-image"></span></label>
                        <label><input type="checkbox" value="snowflake" name="form"><span class="snowflake-image"></span></label>
                        <label><input type="checkbox" value="toy" name="form"><span class="toy-image"></span></label>
                      </div>
                      <div class="color-container"><span class="col-word">Цвет:</span>
                        <input type="checkbox" id="white" name="color" value="white">
                        <label for="white"></label>
                        <input type="checkbox" id="yellow" name="color" value="yellow">
                        <label for="yellow"></label>
                        <input type="checkbox" id="red" name="color" value="red">
                        <label for="red"></label>
                        <input type="checkbox" id="blue" name="color" value="blue">
                        <label for="blue"></label>
                        <input type="checkbox" id="green" name="color" value="green">
                        <label for="green"></label>
                      </div>
                      <div class="size-container" id="size"><span class="col-word">Размер:</span>
                        <input type="checkbox" id="big">
                        <label for="big">Большой</label>
                        <input type="checkbox" id="middle">
                        <label for="middle">Средний</label>
                        <input type="checkbox" id="small">
                        <label for="small">Маленький</label>
                      </div>
                      <div class="like-container"><span class="col-word">Только любимые:</span>
                          <input type="checkbox" id="like">
                          <label for="like"></label>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div class="filter range-filter">
                  <form>
                    <fieldset>
                      <legend>Фильтры по диапазону</legend>
                      <div class="number-container">
                        <label  for="number">Количество экземпляров:</label>
                        <input type="range" id = "number">                 
                      </div>
                      <div class="color-container">
                        <label for="year">Год прирбретения:</label>
                        <input type="range" id = "year">
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div class="filter sorting-filter">
                  <form>
                    <fieldset>
                      <legend>Сортровка</legend>
                      <div class="sorting-container">
                        <select name="select">
                          <option value="value1">По названию от А до Я</option>
                          <option value="value2">По названию от Я до А</option>
                          <option value="value3">По количеству по возрастанию</option>
                          <option value="value4">По количеству по убыванию</option>
                        </select>
                      </div>
                      <div class = "null-filter">Сброс фильтров</div>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div class="toys"></div>
            </section>
        `;
  },
  after_render: async () => {

    const toysBlock = document.querySelector('.toys') as HTMLElement;

    data.forEach((item) => {
      console.log(item);
      const toyCard = document.createElement('div') as HTMLElement;
      const heading = document.createElement('h3') as HTMLElement;
      const image = document.createElement('div') as HTMLElement;
      const number = document.createElement('p') as HTMLElement;
      const year = document.createElement('p') as HTMLElement;
      const form = document.createElement('p') as HTMLElement;
      const color = document.createElement('p') as HTMLElement;
      const size = document.createElement('p') as HTMLElement;
      const like = document.createElement('p') as HTMLElement;

      toyCard.classList.add('toy');

      heading.classList.add('heading');
      image.classList.add('image-toy');
      number.classList.add('number-toy');
      year.classList.add('year-toy');
      form.classList.add('form-toy');
      color.classList.add('color-toy');
      size.classList.add('size-toy');
      like.classList.add('like-toy');

      toysBlock.append(toyCard);

      toyCard.append(heading);
      toyCard.append(image);
      toyCard.append(number);
      toyCard.append(year);
      toyCard.append(form);
      toyCard.append(color);
      toyCard.append(size);
      toyCard.append(like);

      heading.innerText = item.name;
      image.style.background = `url('./src/Assets/toys/${item.num}.png') no-repeat 0 0 / contain`;
      number.innerText = `Количество: ${item.count}`;
      year.innerText = `Год рокупки: ${item.year}`;
      form.innerText = `Форма: ${item.shape}`;
      color.innerText = `Цвет: ${item.color}`;
      size.innerText = `Размер: ${item.size}`;

      if (item.favorite === true) like.innerText = `Любимая: да`;
      else like.innerText = `Любимая: нет`;
    })
  }
};

export default Toys;