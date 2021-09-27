import AuthLayout from 'layouts/AuthLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import PublicLayout from 'layouts/PublicLayout';
import Admin from 'pages/admin/Index';
import Clientes from 'pages/admin/Clientes';
import Vehiculos from 'pages/admin/Vehiculos';
import Index from 'pages/Index';
import Login from 'pages/Login';
import Registro from 'pages/Registro';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={['/admin', '/admin/vehiculos', '/admin/clientes']}>
          <PrivateLayout>
            <Switch>
              <Route path='/admin/vehiculos'>
                <Vehiculos />
              </Route>
              <Route path='/admin/clientes'>
                <Clientes />
              </Route>
              <Route path='/admin'>
                <Admin />
              </Route>
            </Switch>
          </PrivateLayout>
        </Route>
        <Route path={['/login', '/registro']}>
          <AuthLayout>
            <Switch>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/registro'>
                <Registro />
              </Route>
            </Switch>
          </AuthLayout>
        </Route>
        <Route path={['/']}>
          <PublicLayout>
            <Switch>
              <Route path='/'>
                <Index />
              </Route>
            </Switch>
          </PublicLayout>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
