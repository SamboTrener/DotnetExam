import * as React from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {FetchData} from './components/FetchData';
import {Counter} from './components/Counter';

import './custom.css'
import Credit from "./components/Credit";

export function App() {
    return (
        <Layout>
            <Route exact path='/' component={Home}/>
            <Route path='/counter' component={Counter}/>
            <Route path='/fetch-data' component={FetchData}/>
            <Route path='/fetch-credit' component={Credit}/>
        </Layout>
    )
}