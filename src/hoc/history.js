import { createBrowserHistory } from 'history';
import store from '../store';
import * as actions from '../store/actions';

const history = createBrowserHistory();

history.listen(location => {
    let page = location.pathname.split('/')[1];
    
    store.dispatch(actions.curr_page(page));
});

export default history;