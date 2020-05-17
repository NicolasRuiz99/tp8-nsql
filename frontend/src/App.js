import React,{Fragment,useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Mapa from './components/Mapa';
import './bootstrap.min.css'
import Navbar from './components/Navbar';

const App = () => {

	const [search,setSearch] = useState ("");

	return (
		<Fragment>
			<Router>
			<Navbar setSearch={setSearch} search={search} />
			<Switch>
				<Route exact path="/" render={()=>(
					<Mapa/>
				)} />
			</Switch>
			</Router>
		</Fragment>
	);
}

export default App;