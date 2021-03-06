import './toys.css';
// import { render } from '../../interfaces/interface';
// import { data } from '../../../data';
// import { toy } from "../../interfaces/interface";
import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';
import { Component } from '../../Component';
import { Basic, Data, Parent, Toy as IToy } from '../../../types/types';
import homeNav from '../Header/templates/homeNav.html';
import toysMenu from './templates/toysMenu.html'
import toysData from '../../../data.json';
import { Toy } from './toy';
import { ValueFilter } from '../../ValueFilter';
import { RangeFilter } from '../../RangeFilter';
import { SortFilter } from '../../SortFilter';

type Container = Component | null;

export class Toys extends Component {
  toys: Toy[];
  toysContainer: Container;
  valueFilter: Component;
  rangeFilter: Component;
  sortingFilter: Component;

  constructor() {
    super(toysMenu);
    this.toys = Toys.createToys();
    this.valueFilter = new ValueFilter();
    this.rangeFilter = new RangeFilter();
    this.sortingFilter = new SortFilter();
    this.toysContainer = null;

    this.init()
  }

  static createToys() {
    return toysData.map((toyData) => {
      const {num, ...toy} = toyData;
      const image = `./src/Assets/toys/${num}.png`;
      const hide = false;

      return new Toy({ hide, image, num, ...toy} as IToy)
    });
  }

  onFilterChange(filters: Data){
    const { colors, shape, size, favorite } = filters;
    this.toys.forEach((toy) => {
      const { color, shape, year, size, favorite } = toy.model;
    });

    this.clear('.toys');

  }

  clearToys() {
    if (this.toysContainer) {
      // const container = this.toysContainer.getContainer();
      // while (container.firstChild) container.removeChild(container.firstChild);
    }
  }

  init(){
    // this.effects.add(this.renderEffect.bind(this));
    this.valueFilter.modelEffects.add(this.onFilterChange.bind(this));

    this.insert('.set', [
      this.valueFilter,
      this.rangeFilter,
      this.sortingFilter,
    ]);
    this.insert('.toys', this.toys);
  }
}

/*
export const Toys: render = {
  render: async () => {
    return `
            <section class="central-section-toys"> 
              <div class="set">
                <div class="filter value-filter">
                  <form>
                    <fieldset>
                      <legend>?????????????? ???? ????????????????</legend>
                      <div class="form-container"><span class="col-word">??????????:</span>
                        <label><input type="checkbox" value="bell" name="form" class="form-check"><span class="bell-image"></span></label>
                        <label><input type="checkbox" value="ball" name="form" class="form-check"><span class="ball-image"></span></label>
                        <label><input type="checkbox" value="pine" name="form" class="form-check"><span class="pine-image"></span></label>
                        <label><input type="checkbox" value="snowflake" name="form" class="form-check"><span class="snowflake-image"></span></label>
                        <label><input type="checkbox" value="toy" name="form" class="form-check"><span class="toy-image"></span></label>
                      </div>
                      <div class="color-container"><span class="col-word">????????:</span>
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
                      <div class="size-container" id="size"><span class="col-word">????????????:</span>
                        <input type="checkbox" id="big" value="big" class="size-check">
                        <label for="big">??????????????</label>
                        <input type="checkbox" id="middle" value="middle" class="size-check">
                        <label for="middle">??????????????</label>
                        <input type="checkbox" id="small" value="small" class="size-check">
                        <label for="small">??????????????????</label>
                      </div>
                      <div class="like-container"><span class="col-word">???????????? ??????????????:</span>
                          <input type="checkbox" id="like">
                          <label for="like"></label>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div class="filter range-filter">
                  <form>
                    <fieldset>
                      <legend>?????????????? ???? ??????????????????</legend>
                      <div class = "range-container">
                        <div class="number-container">
                          <p class="par-num">???????????????????? ??????????????????????</p>
                          <div id="slider"></div> 
                        </div>
                        <div class="year-container">
                          <p class="par-year">?????? ????????????????????????</p>
                          <div id="slider-year"></div> 
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div class="filter sorting-filter">
                  <form>
                    <fieldset>
                      <legend>??????????????????</legend>
                      <div class="sorting-container">
                        <select id="select">
                          <option value="value1" selected>???? ???????????????? ???? ?? ???? ??</option>
                          <option value="value2">???? ???????????????? ???? ?? ???? ??</option>
                          <option value="value3">???? ???????????????????? ???? ??????????????????????</option>
                          <option value="value4">???? ???????????????????? ???? ????????????????</option>
                        </select>
                      </div>
                      <div class = "null-filter" id="null">?????????? ????????????????</div>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div class="toys"></div>
            </section>
        `;
  },
  after_render: async () => {

    console.log('????????????! 190 ???????????? (???????? ?????????? ???????? -3) \n ?????????????? +8 (?????? ???????????? ?????????????????? ?????? ?????????????? ????????????????????) \n ???????????????? +10 \n ???????????????????? ?????????????? ?? ?????????????????? +20 \n ???????????????????? +20 \n ?????????????? ?? ?????????????????? ?????????????????? ???? ?? ???? +30 \n ?????????????? ???? ???????????????? +38 (???????? ???????? ?? ?????????????????????? ?? ?????????????????? ????????????????) \n ?????????? ?????????????????????????? ?????????????? ???? ???????????????????? ???????????????? ?????????????? ???????? +17 (?????? ??????????????????) \n ?????????? ???????????????? +20 \n ?????????? +30 ' )

    const search = document.getElementById('search') as HTMLInputElement;
    const nullButton = document.getElementById('null') as HTMLInputElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slider: any= document.getElementById('slider') as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sliderYear: any = document.getElementById('slider-year') as HTMLElement;
    const toysBlock = document.querySelector('.toys') as HTMLElement;
    const sort = document.getElementById('select') as HTMLInputElement;
    const likeCheck = document.getElementById('like') as HTMLInputElement;
    let toys = document.querySelectorAll('.toy') as NodeListOf<Element>;

    const formCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll('.form-check'); 
    const sizeCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll('.size-check');
    const colorCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll('.color-check');

    let resultArr: Array<toy> = [];
    let formArr: Array<toy> = [];
    let sizeArr: Array<toy> = [];
    let colorArr: Array<toy> = [];
    let favoriteArr: Array<toy>  = [];
    let timeResultArr: Array<toy> = [];
   
    let d = data;
    let sortVal = "value1";

    // Toys-block
   
    // Make page

     toysShow(data);

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
         number.innerText = `????????????????????: ${item.count}`;
         year.innerText = `?????? ??????????????: ${item.year}`;
         form.innerText = `??????????: ${item.shape}`;
         color.innerText = `????????: ${item.color}`;
         size.innerText = `????????????: ${item.size}`;
 
         if (item.favorite === true) like.innerText = `??????????????: ????`;
         else like.innerText = `??????????????: ??????`;
         
         if(localStorage.getItem('favorites')) {
          favoriteArr = JSON.parse(localStorage.getItem('favorites') || '{}')

          if (favoriteArr.find((el) => el.num == item.num)) toyCard.classList.add ('filterToy');

          const numOfFavorite = document.querySelector('.favorites') as HTMLElement;
          numOfFavorite.innerText = favoriteArr.length.toString();

         } else {
          if(favoriteArr.includes(item)) {
            toyCard.classList.add('filterToy');
          }
         }
         
       })
     }

    // Find 

    search.focus();
    search.select();
    search.addEventListener('input', (e) => {
      let arr = d;
      let resArr = resultArr;
      const text: string = search.value;
      if (text.length > 0) {
        const searchText = new RegExp(".*" + text + ".*", "gi");
        if (resArr.length == 0) {
          arr = arr.filter(v => {
            return (v.name).match(searchText)
          })
          if (arr.length == 0) {
            search.setAttribute('pattern', '[0-9]');
            const customValidy = "????????????????, ???????????????????? ???? ????????????????????";
            const insertedContent = document.querySelector(".error-message") as HTMLElement | null;
            const form = document.getElementById('form') as HTMLElement
            if (insertedContent) {
              insertedContent.remove()
            }
            if (search.validity.patternMismatch == true) {
              const block = document.createElement("div")
              block.innerText = customValidy;
              block.classList.add("error-message")
              form.append(block)
            }
            toysShow(arr)
          } else {
            const insertedContent = document.querySelector(".error-message") as HTMLElement | null;
            if (insertedContent) {
              insertedContent.remove()
            }
            toysShow(arr)
          }
        } else {
          resArr = resArr.filter(v => {
            return (v.name).match(searchText)
          })
          if (resArr.length == 0) {
            search.setAttribute('pattern', '[0-9]');
            const customValidy = "????????????????, ???????????????????? ???? ????????????????????";
            const insertedContent = document.querySelector(".error-message") as HTMLElement | null;
            const form = document.getElementById('form') as HTMLElement
            if (insertedContent) {
              insertedContent.remove()
            }
            if (search.validity.patternMismatch == true) {
              const block = document.createElement("div")
              block.innerText = customValidy;
              block.classList.add("error-message")
              form.append(block)
            }
            toysShow(resArr)
          } else {
            const insertedContent = document.querySelector(".error-message") as HTMLElement | null;
            if (insertedContent) {
              insertedContent.remove()
            }
            toysShow(resArr)
          }
        }
      } else {
        const insertedContent = document.querySelector(".error-message") as HTMLElement | null;
        if (insertedContent) {
          insertedContent.remove()
        }
        if (resArr.length == 0) {
          toysShow(arr)
        } else {
          toysShow(resArr)
        }
      }
    })

    // Reset

    nullButton.addEventListener('click', function () {
      sortVal = "value1";
      slider.noUiSlider.updateOptions({
        start: [1, 12]
      });
      sliderYear.noUiSlider.updateOptions({
        start: [1940, 2020]
      });
      sort.value = "value1";

      if (likeCheck.checked) likeCheck.checked = false;

      const newArrForm: HTMLInputElement[] = Array.from(formCheck).filter((ele) => ele.checked);
      newArrForm.forEach(el => el.checked = false);

      const newArrSize: HTMLInputElement[] = Array.from(sizeCheck).filter((ele) => ele.checked);
      newArrSize.forEach(el => el.checked = false);

      const newArrColor: HTMLInputElement[] = Array.from(colorCheck).filter((ele) => ele.checked);
      newArrColor.forEach(el => el.checked = false);
      
      resultArr = [];
      formArr = [];
      colorArr = [];
      sizeArr = [];
      d = data;
      toysShow(d)
      setToysListener()
    });

    // NoUiSlider

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

    // Sort filter

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
        toysShow(resultArr)
      } else {
        toysShow(data)
      }
      setToysListener()
    })

    // Range filter
    //  Num-range

    slider.noUiSlider.on('change', (val: Array<number>) => {
      let innerArr: Array<toy> = resultArr;
      const first = val[0];
      const last = val[1];
      if (innerArr.length == 0) {
        d = data;
        d = d.filter((v) => +v.count >= +first && +v.count <= +last);
        toysShow(d);
      } else {
        innerArr = innerArr.filter((v) => +v.count >= +first && +v.count <= +last);
        toysShow(innerArr);
      }
      setToysListener()
    })

    // Year-range

    sliderYear.noUiSlider.on('change', (val: Array<number>) => {
      let innerArr: Array<toy> = resultArr;
      const first = val[0];
      const last = val[1];
      if (innerArr.length == 0) {
        d = data;
        d = d.filter((v) => +v.year >= +first && +v.year <= +last);
        toysShow(d);
      } else {
        innerArr = innerArr.filter((v) => +v.year >= +first && +v.year <= +last);
        toysShow(innerArr);
      }
      setToysListener()
    })

    // Like-filter


    likeCheck.addEventListener('change', (e) => {
    
      if (likeCheck.checked) {
        timeResultArr = resultArr;
        d = d.filter(v => v.favorite == true);
        if (resultArr.length > 0) {
          resultArr = resultArr.filter(v => d.includes(v))
          toysShow(resultArr)
        } else {
          toysShow(d)
        }
      } else {
        d = data;
        if (resultArr.length > 0) {
          toysShow(timeResultArr)
        } else {
          toysShow(d)
        }
      }
      setToysListener()
    })

    // Forms-filter
    
    formCheck.forEach((el) => {
      el.addEventListener('change', () => {

        const newArr: HTMLInputElement[] = Array.from(formCheck).filter((ele) => ele.checked);

        if (newArr.length > 0) {
          formArr = [];
          newArr.forEach((elem) => {
            switch (elem.value) {
              case "ball":
                d.filter(v => v.shape == "??????").forEach(p => formArr.push(p))
                break;
              case "bell":
                d.filter(v => v.shape == "??????????????????????").forEach(p => formArr.push(p))
                break;
              case "pine":
                d.filter(v => v.shape == "??????????").forEach(p => formArr.push(p))
                break;
              case "snowflake":
                d.filter(v => v.shape == "????????????????").forEach(p => formArr.push(p))
                break;
              case "toy":
                d.filter(v => v.shape == "??????????????").forEach(p => formArr.push(p))
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
          d = data;
          toysShow(d)
        } else toysShow(resultArr)
        setToysListener()
      })
    })

    //   Size filter
 
    sizeCheck.forEach((el) => {
      el.addEventListener('change', () => {
        const newArr: HTMLInputElement[] = Array.from(sizeCheck).filter((ele) => ele.checked)
        if (newArr.length > 0) {
          sizeArr = [];
          newArr.forEach((elem) => {
            switch (elem.value) {
              case "big":
                d.filter(v => v.size == "??????????????").forEach(p => sizeArr.push(p))
                break;
              case "middle":
                d.filter(v => v.size == "??????????????").forEach(p => sizeArr.push(p))
                break;
              case "small":
                d.filter(v => v.size == "??????????").forEach(p => sizeArr.push(p))
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
          d = data;
          toysShow(d)
        } else toysShow(resultArr)
        setToysListener()
      })

    })

    // Color filter

    colorCheck.forEach((el) => {
      el.addEventListener('change', (e) => {
        e.stopPropagation
        const newArr: HTMLInputElement[] = Array.from(colorCheck).filter((ele) => ele.checked)
        if (newArr.length > 0) {
          colorArr = [];
          newArr.forEach((elem) => {
            switch (elem.value) {
              case "white":
                d.filter(v => v.color == "??????????").forEach(p => colorArr.push(p))
                break;
              case "yellow":
                d.filter(v => v.color == "????????????").forEach(p => colorArr.push(p))
                break;
              case "red":
                d.filter(v => v.color == "??????????????").forEach(p => colorArr.push(p))
                break;
              case "blue":
                d.filter(v => v.color == "??????????").forEach(p => colorArr.push(p))
                break;
              case "green":
                d.filter(v => v.color == "??????????????").forEach(p => colorArr.push(p))
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
          d = data;
          toysShow(d)
        } else toysShow(resultArr)
        setToysListener()
      })

    })

    // Add to favorite
 
    function setToysListener() {
      
      toys = document.querySelectorAll('.toy') as NodeListOf<Element>;
      toys.forEach(el => el.addEventListener('click', (e) => {
        let newArr: Array<toy>;
        const cont: string | null = el.childNodes[0].textContent;

        if (localStorage.getItem('favorites')) {  
          favoriteArr = JSON.parse(localStorage.getItem('favorites') || '')
        }


        if (resultArr.length == 0) {newArr = d;}
        else {newArr = resultArr}


        if (favoriteArr.length < 20) {

          newArr = newArr.filter(el => el.name == cont);
            

            if (!favoriteArr.find(el => el.num == newArr[0].num)) {
              favoriteArr.push(newArr[0]);
              el.classList.toggle('filterToy');


              localStorage.setItem('favorites', JSON.stringify(favoriteArr))
            } else {
              favoriteArr = favoriteArr.filter(el => el.num !== newArr[0].num);
              el.classList.toggle('filterToy');

              localStorage.setItem('favorites', JSON.stringify(favoriteArr))
            }
           
      
          const numOfFavorite = document.querySelector('.favorites') as HTMLElement;
          numOfFavorite.innerText = favoriteArr.length.toString()

        } else if (el.classList.contains('filterToy')) {
          newArr = newArr.filter(el => el.name == cont);
          favoriteArr = favoriteArr.filter(el => el.num !== newArr[0].num);
          el.classList.toggle('filterToy');

          localStorage.setItem('favorites', JSON.stringify(favoriteArr))
        } else {
          alert ('????????????????, ?????? ?????????? ??????????????????')
        } 
      }))
    }
    setToysListener()
  }
}

export default Toys;*/
