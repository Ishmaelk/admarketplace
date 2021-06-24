import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostProvider from './PostProvider';
import PostSelectView from './PostSelectView';
import PostView from './PostView';
import NotFoundView from './NotFoundView';
import './App.css';


export default function App() {
  return (
    <PostProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <PostSelectView />
          </Route>
          <Route path='/posts'>
            <PostView />
          </Route>
          <Route exact path='*'>
            <NotFoundView />
          </Route>
        </Switch>
      </Router>
    </PostProvider>
  );
}
