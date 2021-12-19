import './toys.css';
import { render } from '../../interface/interface';
import { data } from '../../../data';
import { toy } from "../../interface/interface";
import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';



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
                        <label><input type="checkbox" value="bell" name="form" class="form-check"><span class="bell-image"></span></label>
                        <label><input type="checkbox" value="ball" name="form" class="form-check"><span class="ball-image"></span></label>
                        <label><input type="checkbox" value="pine" name="form" class="form-check"><span class="pine-image"></span></label>
                        <label><input type="checkbox" value="snowflake" name="form" class="form-check"><span class="snowflake-image"></span></label>
                        <label><input type="checkbox" value="toy" name="form" class="form-check"><span class="toy-image"></span></label>
                      </div>
                      <div class="color-container"><span class="col-word">Цвет:</span>
                        <input type="checkbox" id="white" name="color" value="white" class="color-check">
                        <label for="white"></label>
                        <input type="checkbox" id="yellow" name="color" value="yellow" class="color-check">
                        <label for="yellow"></label>
                        <input type="checkbox" id="red" name="color" value="red" class="color-check">
                        <label for="red"></label>
                        <input type="checkbox" id="blue" name="color" value="blue" class="color-check">
                        <label for="blue"></label>
                        <input type="checkbox" id="green" name="color" value="green" class="color-check">
                        <label for="green"></label>
                      </div>
                      <div class="size-container" id="size"><span class="col-word">Размер:</span>
                        <input type="checkbox" id="big" value="big" class="size-check">
                        <label for="big">Большой</label>
                        <input type="checkbox" id="middle" value="middle" class="size-check">
                        <label for="middle">Средний</label>
                        <input type="checkbox" id="small" value="small" class="size-check">
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
                        <p class="par-num">Количество экземпляров</p>
                        <div id="slider"></div> 
                      </div>
                      <div class="year-container">
                        <p class="par-year">Год приобоитения</p>
                        <div id="slider-year"></div> 
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
                      <div class = "null-filter" id="null">Сброс фильтров</div>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div class="toys"></div>
            </section>
        `;
  },
  after_render: async () => {

    // NoUiSlider

    const slider: any = document.getElementById('slider') as HTMLElement;
    const sliderYear: any = document.getElementById('slider-year') as HTMLElement;

    noUiSlider.create(slider, {
      start: [1, 12],
      connect: true,
      range: {
        'min': 1,
        'max': 12
      },
      format: {
        to: function (value: number): string {
          return Math.round(value) + '';
        },
        from: function (value: string): number {
          return Number(value.replace(',-', ''));
        }
      },
      tooltips: true,
    });

    noUiSlider.create(sliderYear, {
      start: [1940, 2020],
      connect: true,
      range: {
        'min': 1940,
        'max': 2020
      },
      format: {
        to: function (value: number): string {
          return Math.round(value) + '';
        },
        from: function (value: string): number {
          return Number(value.replace(',-', ''));
        }
      },
      tooltips: true,
    });

    const nullButton: any = document.getElementById('null');

    nullButton.addEventListener('click', function () {
      slider.noUiSlider.updateOptions({
        start: [1, 12]
      });
    });

    nullButton.addEventListener('click', function () {
      sliderYear.noUiSlider.updateOptions({
        start: [1940, 2020]
      });
    });


    // Toys-block
    const toysBlock = document.querySelector('.toys') as HTMLElement;

    data.forEach((item): void => {
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

    function toysShow(arr: Array<toy>): void {
      toysBlock.innerHTML = "";
      arr.forEach((item) => {
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

    // Forms-filter

    const formCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form-check');
    let formArr: Array<toy> = [];

    formCheck.forEach((el) => {
      el.addEventListener('change', () => {
        const newArr: HTMLInputElement[] = Array.from(formCheck).filter((ele) => ele.checked)
        if (newArr.length > 0) {
          formArr = [];
          newArr.forEach((elem) => {
            switch (elem.value) {
              case "ball":
                data.filter(v => v.shape == "шар").forEach(p => formArr.push(p))
                break;
              case "bell":
                data.filter(v => v.shape == "колокольчик").forEach(p => formArr.push(p))
                break;
              case "pine":
                data.filter(v => v.shape == "шишка").forEach(p => formArr.push(p))
                break;
              case "snowflake":
                data.filter(v => v.shape == "снежинка").forEach(p => formArr.push(p))
                break;
              case "toy":
                data.filter(v => v.shape == "фигурка").forEach(p => formArr.push(p))
                break;
            }
            toysShow(formArr);
          })
        } else {
          formArr = [];
          toysShow(data);
        }
      })
    })

    // Color-filter

    const colorCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll('.color-check');
    let colorArr: Array<toy> = [];

    colorCheck.forEach((el) => {
      el.addEventListener('change', () => {
        const newArr: HTMLInputElement[] = Array.from(colorCheck).filter((ele) => ele.checked)
        console.log(newArr)
        if (newArr.length > 0) {
          colorArr = [];
          newArr.forEach((elem) => {
            switch (elem.value) {
              case "white":
                data.filter(v => v.color == "белый").forEach(p => colorArr.push(p))
                break;
              case "yellow":
                data.filter(v => v.color == "желтый").forEach(p => colorArr.push(p))
                break;
              case "red":
                data.filter(v => v.color == "красный").forEach(p => colorArr.push(p))
                break;
              case "blue":
                data.filter(v => v.color == "синий").forEach(p => colorArr.push(p))
                break;
              case "green":
                data.filter(v => v.color == "зелёный").forEach(p => colorArr.push(p))
                break;
            }
            toysShow(colorArr);
          })
        } else {
          colorArr = [];
          toysShow(data);
        }
      })
    })

    // Size-filter

    const sizeCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll('.size-check');
    let sizeArr: Array<toy> = [];

    sizeCheck.forEach((el) => {
      console.log(el.value)
      el.addEventListener('change', () => {
        const newArr: HTMLInputElement[] = Array.from(sizeCheck).filter((ele) => ele.checked)
        if (newArr.length > 0) {
          sizeArr = [];
          newArr.forEach((elem) => {
            switch (elem.value) {
              case "big":
                data.filter(v => v.size == "большой").forEach(p => sizeArr.push(p))
                break;
              case "middle":
                data.filter(v => v.size == "средний").forEach(p => sizeArr.push(p))
                break;
              case "small":
                data.filter(v => v.size == "малый").forEach(p => sizeArr.push(p))
                break;
            }
            toysShow(sizeArr);
          })
        } else {
          sizeArr = [];
          toysShow(data);
        }
      })
    })

    // Like-filter

    const likeCheck = document.getElementById('like') as HTMLInputElement;
    let likeArr: Array<toy> = [];


    likeCheck.addEventListener('change', () => {
      if (likeCheck.checked) {
        likeArr = [];

        data.filter(v => v.favorite == true).forEach(p => likeArr.push(p));
        toysShow(likeArr);
      } else {
        likeArr = [];
        toysShow(data);
      }
    })

    
  }
}

export default Toys;