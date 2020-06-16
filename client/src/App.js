import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './layout/Navbar'
import NewEntry from './components/present/NewEntry'
import PastEntries from './components/past/PastEntries'

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path='/' component={NewEntry} />
            <Route path='/present' component={NewEntry} />
            <Route path='/past' component={PastEntries} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
