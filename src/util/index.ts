interface IMapping {
  [key: string]: string;
}

const BACKGROUND_IMAGE_MAP: IMapping = {
  "/game": "/assets/background/red.png",
  "/kids-stories": "/assets/background/teal.png",
  "/fun-facts": "/assets/background/blue.jpg",
  "/staging/game": "/assets/background/red.png",
  "/staging/kids-stories": "/assets/background/teal.png",
  "/staging/fun-facts": "/assets/background/blue.jpg",
  "default": "/assets/background/teal.png"
}

export const updateBackgroundForPath = (path: string) => {
  let backgroundImage: string = BACKGROUND_IMAGE_MAP["default"];
  Object.keys(BACKGROUND_IMAGE_MAP).forEach((key: string) => {
    if (path.match(key)) {
      backgroundImage = BACKGROUND_IMAGE_MAP[key];
    }
  });
  document.body.style.backgroundImage = `url('${backgroundImage}')`;
}
