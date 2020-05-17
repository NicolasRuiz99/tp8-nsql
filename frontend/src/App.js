import React,{Fragment,useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Mapa from './components/Mapa';
import './bootstrap.min.css'
import Navbar from './components/Navbar';
import AddRestaurant from './components/AddRestaurant';
import RestaurantInfo from './components/RestaurantInfo';

const App = () => {

	const [search,setSearch] = useState ("");
	const [searchClick,setSearchClick] = useState (false);

	return (
		<Fragment>
			<Router>
			<Navbar setSearch={setSearch} setSearchClick={setSearchClick} search={search} />
			<Switch>
				<Route exact path="/" render={()=>(
					<Mapa search={search} searchClick={searchClick} setSearchClick={setSearchClick} />
				)} />
				<Route exact path="/add" render={()=>(
					<AddRestaurant/>
				)}/>
				<Route exact path="/restaurant/:id" render={(props)=>(
					<RestaurantInfo 
						id = {props.match.params.id}
					/>
				)}/>
			</Switch>
			</Router>
		</Fragment>
	);
}

export default App;