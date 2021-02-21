import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen((location, action) => {
    console.log(action, "=>", location.pathname)
});

export default history;