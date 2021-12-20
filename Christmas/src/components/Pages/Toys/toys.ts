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
                        <select id="select">
                          <option value="value1" selected>По названию от А до Я</option>
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

    let resultArr: Array<toy> = [];
    let sortVal = "value1";
    let sizeArr: Array<toy> = [];
    let colorArr: Array<toy> = [];
    let d = data;

    
    data.forEach((item): void => {

      if (sortVal == "value1") {
        data.sort((a: toy, b: toy) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      } else if (sortVal == "value2") {
        data.sort((a: toy, b: toy) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        })
      } else if (sortVal == "value3") {
        data.sort((a: toy, b: toy) => {
          if (+a.count > +b.count) {
            return 1;
          }
          if (+a.count < +b.count) {
            return -1;
          }
          return 0;
        })
      } else if (sortVal == "value4") {
        data.sort((a: toy, b: toy) => {
          if (+a.count >+b.count) {
            return -1;
          }
          if (+a.count < +b.count) {
            return 1;
          }
          return 0;
        })
      }

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
      if (sortVal == "value1") {
        arr.sort((a: toy, b: toy) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      } else if (sortVal == "value2") {
        arr.sort((a: toy, b: toy) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        })
      } else if (sortVal == "value3") {
        arr.sort((a: toy, b: toy) => {
          if (+a.count > +b.count) {
            return 1;
          }
          if (+a.count < +b.count) {
            return -1;
          }
          return 0;
        })
        console.log(arr)
      } else if (sortVal == "value4") {
        arr.sort((a: toy, b: toy) => {
          if (+a.count > +b.count) {
            return -1;
          }
          if (+a.count < +b.count) {
            return 1;
          }
          return 0;
        })
      }



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


    // Sort filter

    const sort = document.getElementById('select') as HTMLInputElement;
    sort.addEventListener('change', () => {
      switch (sort.value) {
        case "value1": 
        sortVal = "value1";
        break;
        case "value2": 
        sortVal = "value2";
        break;
        case "value3": 
        sortVal = "value3";
        break;
        case "value4": 
        sortVal = "value4";
        break;
      } 
      if (resultArr.length > 0) {
        toysShow (resultArr)
      } else toysShow (data)
    })


    // Like-filter

    const likeCheck = document.getElementById('like') as HTMLInputElement;
    likeCheck.addEventListener('change', (e) => {
      e.stopPropagation;
      if (likeCheck.checked) {
        d = data.filter(v => v.favorite == true);
        if (sizeArr.length == 0 && colorArr.length == 0 && formArr.length == 0) {
          toysShow(d)
        } else {
          resultArr = resultArr.filter(v => d.includes(v))
          toysShow(resultArr)
        }
      } else {
        d = data;
        if (sizeArr.length == 0 && colorArr.length == 0 && formArr.length == 0) {
          toysShow(d)
        } else {
          toysShow(resultArr)
        }
      }
    })

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
                d.filter(v => v.shape == "шар").forEach(p => formArr.push(p))
                break;
              case "bell":
                d.filter(v => v.shape == "колокольчик").forEach(p => formArr.push(p))
                break;
              case "pine":
                d.filter(v => v.shape == "шишка").forEach(p => formArr.push(p))
                break;
              case "snowflake":
                d.filter(v => v.shape == "снежинка").forEach(p => formArr.push(p))
                break;
              case "toy":
                d.filter(v => v.shape == "фигурка").forEach(p => formArr.push(p))
                break;
            }
          })
        } else {
          formArr = [];
        }

        if (formArr.length > 0) {
          if (sizeArr.length > 0 && colorArr.length == 0) {
            resultArr = formArr.filter(v => sizeArr.includes(v));
          } else if (colorArr.length > 0 && sizeArr.length == 0) {
            resultArr = formArr.filter(v => colorArr.includes(v));
          } else if (colorArr.length > 0 && sizeArr.length > 0) {
            resultArr = formArr.filter(v => sizeArr.includes(v)).filter(v => colorArr.includes(v));
          } else {
            resultArr = formArr;
          }
        } else if (sizeArr.length > 0 && colorArr.length == 0) {
          resultArr = sizeArr;
        } else if (sizeArr.length == 0 && colorArr.length > 0) {
          resultArr = colorArr;
        } else {
          resultArr = colorArr.filter(v => sizeArr.includes(v))
        }

        if (sizeArr.length == 0 && colorArr.length == 0 && formArr.length == 0) {
          toysShow(d)
        } else toysShow(resultArr)
      })
    })

    //   Size filter

    const sizeCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll('.size-check');

    sizeCheck.forEach((el) => {
      el.addEventListener('change', () => {
        const newArr: HTMLInputElement[] = Array.from(sizeCheck).filter((ele) => ele.checked)
        if (newArr.length > 0) {
          sizeArr = [];
          newArr.forEach((elem) => {
            switch (elem.value) {
              case "big":
                d.filter(v => v.size == "большой").forEach(p => sizeArr.push(p))
                break;
              case "middle":
                d.filter(v => v.size == "средний").forEach(p => sizeArr.push(p))
                break;
              case "small":
                d.filter(v => v.size == "малый").forEach(p => sizeArr.push(p))
                break;
            }
          })
        } else {
          sizeArr = [];
        }
        if (sizeArr.length > 0) {
          if (formArr.length > 0 && colorArr.length == 0) {
            resultArr = sizeArr.filter(v => formArr.includes(v));
          } else if (colorArr.length > 0 && formArr.length == 0) {
            resultArr = sizeArr.filter(v => colorArr.includes(v));
          } else if (colorArr.length > 0 && formArr.length > 0) {
            resultArr = sizeArr.filter(v => formArr.includes(v)).filter(v => colorArr.includes(v));
          } else {
            resultArr = sizeArr
          }
        } else if (colorArr.length > 0 && formArr.length == 0) {
          resultArr = colorArr;
        } else if (colorArr.length == 0 && formArr.length > 0) {
          resultArr = formArr;
        } else {
          resultArr = colorArr.filter(v => formArr.includes(v))
        }

        if (sizeArr.length == 0 && colorArr.length == 0 && formArr.length == 0) {
          toysShow(d)
        } else toysShow(resultArr)
      })
    })

    // Color filter

    const colorCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll('.color-check');

    colorCheck.forEach((el) => {
      el.addEventListener('change', (e) => {
        e.stopPropagation
        const newArr: HTMLInputElement[] = Array.from(colorCheck).filter((ele) => ele.checked)
        if (newArr.length > 0) {
          colorArr = [];
          newArr.forEach((elem) => {
            switch (elem.value) {
              case "white":
                d.filter(v => v.color == "белый").forEach(p => colorArr.push(p))
                break;
              case "yellow":
                d.filter(v => v.color == "желтый").forEach(p => colorArr.push(p))
                break;
              case "red":
                d.filter(v => v.color == "красный").forEach(p => colorArr.push(p))
                break;
              case "blue":
                d.filter(v => v.color == "синий").forEach(p => colorArr.push(p))
                break;
              case "green":
                d.filter(v => v.color == "зелёный").forEach(p => colorArr.push(p))
                break;
            }
          })
        } else {
          colorArr = [];
        }
        if (colorArr.length > 0) {
          if (formArr.length > 0 && sizeArr.length == 0) {
            resultArr = colorArr.filter(v => formArr.includes(v));
          } else if (sizeArr.length > 0 && formArr.length == 0) {
            resultArr = colorArr.filter(v => sizeArr.includes(v));
          } else if (sizeArr.length > 0 && formArr.length > 0) {
            resultArr = colorArr.filter(v => formArr.includes(v)).filter(v => sizeArr.includes(v));
          } else {
            resultArr = colorArr
          }
        } else if (sizeArr.length > 0 && formArr.length == 0) {
          resultArr = sizeArr;
        } else if (sizeArr.length == 0 && formArr.length > 0) {
          resultArr = formArr;
        } else {
          resultArr = sizeArr.filter(v => formArr.includes(v))
        }

        if (sizeArr.length == 0 && colorArr.length == 0 && formArr.length == 0) {
          toysShow(d)
        } else toysShow(resultArr)
      })
    })



  }
}

export default Toys;