import { provide2DContext } from "./contexts/2d";
import { Layer, provideLayer } from "./contexts/layer";
import { provideTime, Time } from "./contexts/time";
import { isDrawable } from "./interfaces/drawable";
import { handlesMount, HandlesMount } from "./interfaces/handles-mount";
import { handlesResize } from "./interfaces/handles-resize";
import { isUpdatable } from "./interfaces/updatable";
import { GameCavnas } from "./objects/game-canvas";
import { MainScreen } from "./screens/main-screen";
import "./style.css";

const gameCanvas = new GameCavnas(window);
const globalLayer = new Layer();
const screenLayer = new Layer([new MainScreen()]);
const mounted = new WeakSet<HandlesMount>();
let resized = false;
let updateTime = new Time();
let drawTime = new Time();

const setup = () => {
  globalLayer.add(gameCanvas);
  globalLayer.add(screenLayer);

  window.addEventListener("resize", () => {
    resized = true;
  });

  updateTime = Time.update(updateTime);
  drawTime = Time.update(drawTime);
};

const loop = () => {
  provide2DContext(gameCanvas.context, () => {
    // mount
    let didMount = false;
    do {
      didMount = false;
      for (const { object, layer } of globalLayer.objects()) {
        provideLayer(layer, () => {
          if (handlesMount(object) && !mounted.has(object)) {
            object.onMount();
            mounted.add(object);
            didMount = true;
          }
        });
      }
    } while (didMount);

    // resize
    if (resized) {
      for (const { object, layer } of globalLayer.objects()) {
        provideLayer(layer, () => {
          if (handlesResize(object)) {
            object.onResize(window.innerWidth, window.innerHeight);
          }
        });
      }
      resized = false;
    }

    // update
    updateTime = Time.update(updateTime);
    provideTime(updateTime, () => {
      for (const { object, layer } of globalLayer.objects()) {
        provideLayer(layer, () => {
          if (isUpdatable(object)) {
            object.update();
          }
        });
      }
    });

    // draw
    drawTime = Time.update(drawTime);
    provideTime(drawTime, () => {
      for (const { object, layer } of globalLayer.objects()) {
        provideLayer(layer, () => {
          if (isDrawable(object)) {
            object.draw();
          }
        });
      }
    });
  });
};

setup();
(() => {
  const actualLoop = () => {
    loop();
    requestAnimationFrame(actualLoop);
  };

  requestAnimationFrame(actualLoop);
})();

console.log(globalLayer);
