import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import NotFound from '~/components/NotFound';
import { RoutePath } from '~/interfaces';
import Vis from '~/pages/Vis';
import G6Graph from '~/pages/G6';
import ForceGraph from '~/pages/ForceGraph';
// import Mine from '~/pages/Mine';
// import LabWrapper from '~/components/LabWrapper';
import styles from './app.module.less';

const { Content, Footer } = Layout;

const history = createBrowserHistory();

const Mine = React.lazy(() => import(/* webpackChunkName: "mine" */ '~/pages/Mine'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "notfound" */ '~/components/NotFound'));

function App() {
  return (
    <Layout className={styles.layout}>
      <Switch>
        <Route exact path="/" component={() => <Vis />} />
        <Route exact path="/g6" component={() => <G6Graph />} />
        <Route exact path="/force-graph" component={() => <ForceGraph />} />
        <Route path="/:labId/:labSubRoute?">
          <Content className={styles.content}>
            <Switch>
              <Route path={`/:labId/${RoutePath.Mine}`} component={() => <Mine />} />
              <Route exact path="/:labId" component={() => <Redirect to={RoutePath.Mine} />} />
              <Route component={() => <NotFound />} />
            </Switch>
          </Content>
        </Route>
        <Route component={() => <NotFound />} />
      </Switch>
      <Footer style={{ textAlign: 'center' }}>footer</Footer>
    </Layout>
  );
}

export default function AppProvider() {
  return (
    <Router history={history}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Router>
  );
}

export const HotApp = hot(AppProvider);
