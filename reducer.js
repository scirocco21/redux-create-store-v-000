// createStore function is completely general and can be called with a specific reducer that is elsewhere defined
function createStore(reducer) {
  // put state inside function instead of making it global variable
  let state;

  // move dispatch() into createStore so it can access the state variable
  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state;
  };
  // return objects with two functions, one to retrieve state, one to update it via reducer
  return {
    dispatch,
    getState
  };
};

function changeCount(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
}

function render() {
  let container = document.getElementById('container');
  // render now needs store to call its own getState() method, which in turn has the property of count
  container.textContent = store.getState().count;
};

let store = createStore(changeCount) // createStore takes the changeCount reducer as an argument
store.dispatch({ type: '@@INIT' });
let button = document.getElementById('button');

button.addEventListener('click', function() {
  store.dispatch({ type: 'INCREASE_COUNT' });
});
