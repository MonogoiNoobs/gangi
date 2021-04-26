function* yjsnpi() {
  for (; ;) {
    yield 0;
    yield 1;
    yield 2;
    yield 3;
  }
}

const yjsnpiFrame = yjsnpi();
const yjsnpiImg = new Image();
yjsnpiImg.src = `./img/${yjsnpiFrame.next().value}.png`;

const commentWrapper = document.createElement("div");
commentWrapper.classList.add("commentyjsnpi");
const comment = document.createElement("p");
commentWrapper.append(comment);


const generateComment = () => {
  const random = Math.random() * 3 | 0;
  const size = [2, 4, 6];
  const top = [59, 57, 55];
  const element = commentWrapper.cloneNode(true);
  element.firstChild.textContent = (["!", "！"][Math.random() * 2 | 0]).repeat(Math.random() * 36 + 1 | 0);
  element.firstChild.style.cssText = `
    position: relative;
    font-size: ${size[random]}rem;
    top: ${top[random] * (1 - Math.random())}rem;
  `.trim().replace(/\n/, "");

  return element;
}

const main = () => {
  document.body.append(yjsnpiImg);

  document.addEventListener("keydown", event => {
    event.preventDefault();
    new Audio("./conan.opus").play();
    yjsnpiImg.src = `./img/${yjsnpiFrame.next().value}.png`;
    if (1 - Math.random() < 0.4) {
      const self = document.body.appendChild(generateComment());
      window.setTimeout(() => self.remove(), 3000);
    }
  }, false);
};

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", main, false);
else
  main();
