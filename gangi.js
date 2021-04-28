export class Gangi {
  constructor({
    commentWrapperElement,
    commentElement,
    commentClass
  } = {
      commentWrapperElement: "div",
      commentElement: "p",
      commentClass: "commentyjsnpi",
    }) {
    this.frame = this.count();

    this.img = document.createElement("img");
    this.img.src = `./img/${this.frame.next().value}.png`;

    this.commentWrapper = document.createElement(commentWrapperElement);
    this.commentWrapper.classList.add(commentClass);

    this.comment = document.createElement(commentElement);
    this.commentWrapper.append(this.comment);
  }

  *count() {
    for (; ;) {
      yield 0;
      yield 1;
      yield 2;
      yield 3;
    }
  }

  getComment() {
    const random = Math.random() * 3 | 0;
    const size = [2, 4, 6];
    const top = [59, 57, 55];
    const element = this.commentWrapper.cloneNode(true);

    element.firstChild.textContent = (["!", "！"][Math.random() * 2 | 0]).repeat(Math.random() * 36 + 1 | 0);
    element.firstChild.style.cssText = `
      position: relative;
      font-size: ${size[random]}rem;
      top: ${top[random] * (1 - Math.random())}rem;
    `;

    return element;
  }

  keydownEvent(event) {
    event.preventDefault();
    this.img.src = `./img/${this.frame.next().value}.png`;

    new Audio("./conan.opus").play();

    if (1 - Math.random() > 0.4) return;

    const self = document.body.appendChild(this.getComment());
    window.setTimeout(() => self.remove(), 3000);
  }

  main() {
    document.body.append(this.img);

    document.addEventListener("keydown", this.keydownEvent.bind(this), false);
  }

  apply() {
    const main = this.main.bind(this);

    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", main, false);
    else
      main();
  }
};
