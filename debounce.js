function debounce(func, wait = 50, immediate) {
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
  }
}
