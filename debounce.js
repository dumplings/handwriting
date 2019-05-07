// function debounce(fn, wait = 50, immediate) {
//   let timer;
//   return function () {
//     clearTimeout(timer);
//     if (immediate) {
//       fn.apply(this, arguments);
//     } else {
//       timer = setTimeout(() => fn.apply(this, arguments), wait);
//     }
//   };
// }
function debounce(func, wait = 50, immediate = true) {
  let timer, context, args;
  const later = () => setTimeout(() => {
    timer = null;
    if (!immediate) {
      func.apply(context, args);
      context = args = null;
    }
  }, wait);

  return function (...params) {
    if (!timer) {
      timer = later();
      if (immediate) {
        func.apply(this, params);
      } else {
        context = this;
        args = params;
      }
    } else {
      clearTimeout(timer);
      timer = later();
    }
  };
}

function test(func, wait, immediate = true) {
  let timer;
  return function (...params) {
    clearTimeout(timer);
    if (immediate) {
      func.apply(this, params);
    } else {
      timer = setTimeout(() => func.apply(this, params));
    }
  };
}

const log = test(() => console.log(1), 500, false);
for (let i = 0; i < 100; i++) {
  log();
}
