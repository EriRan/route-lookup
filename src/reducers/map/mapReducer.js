const INITIAL_STATE = {
  isScrolling: false,
  scrollLeft: null,
  scrollTop: null,
  clientX: null,
  clientY: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
