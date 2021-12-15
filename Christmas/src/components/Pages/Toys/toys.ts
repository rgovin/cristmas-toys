import './toys.css';
import { render } from '../../interface/interface';
import { data } from '../../../data'

export const Toys: render = {
  render: async () => {
    return `
            <section class="central-section-toys">
              <div class="toys">

              </div>
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

      toyCard.append (heading);
      toyCard.append (image);
      toyCard.append (number);
      toyCard.append (year);
      toyCard.append (form);
      toyCard.append (color);
      toyCard.append (size);
      toyCard.append (like);

      heading.innerText = item.name;
      image.style.background = `url('./src/Assets/toys/${item.num}.png') no-repeat 0 0 / cover`;
      number.innerText = `Количество: ${item.count}`
      year.innerText = `Год рокупки: ${item.year}`;
      form.innerText = `Форма: ${item.shape}`
      color.innerText = `Цвет: ${item.color}`
      size.innerText = `Размер: ${item.size}`;

      if (item.favorite === true) like.innerText = `Любимая: да`;
      else like.innerText = `Любимая: нет`;
    })
  }
};

export default Toys;