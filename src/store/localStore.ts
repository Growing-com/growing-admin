const GROWING_KEY = "GROWING_KEY";

const localStorage = {
  setLocalStorage: (item: any) => {
    return window.localStorage.setItem(GROWING_KEY, JSON.stringify(item));
  },
  getLocalStorage: () => {
    return "1";
  },
  removeAllLocalStorage: () => {
    return "1";
  }
};

export default localStorage;
