import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchLink } from './components/FetchLink';
import { AddLink } from './components/AddLink';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/fetch-Link' component={FetchLink} />
        <Route path='/add-link' component={AddLink} />
        <Route path='/link/edit/:id' component={AddLink} />
    </Layout>
    );
  }
}
