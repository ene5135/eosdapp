import React, { Component } from 'react';
import { Grid, Form, Button } from 'react-bootstrap';
import { CONTRACT_NAME, TABLE_NAME, LOCAL_NETWORK_HOST, LOCAL_NETWORK_PORT } from '../global.js'; 
import * as Eos from 'eosjs';

class SearchComponent extends Component {
	state = {
		queryMusicName:'',
	};


	/*
	 * this function get entire table of our smart contract
	 * and filter table by input musicname
	 */
    getMusicsTable(){
		const httpEndpoint = `http://${LOCAL_NETWORK_HOST}:${LOCAL_NETWORK_PORT}`;
		const eos = Eos.Localnet({httpEndpoint:httpEndpoint});
		eos.getTableRows({
			"json": true,
			"scope": CONTRACT_NAME,
			"code": CONTRACT_NAME,
			"table": TABLE_NAME,
			"limit": 500
		}).then(result => {
			let filteredTable = result.rows.filter((val) => { return val.music_name === this.state.queryMusicName; });
			console.log(filteredTable);
			this.props.onSetMusicsTable(filteredTable);
			this.props.onBusyEnd();
			console.log(this.props.statefunction);
		});
		return;
	}       

	onSubmit = async (event) => {
		event.preventDefault();
		this.props.onBusyStart();
		await this.getMusicsTable();
	}; //onSubmit

	captureMusicName = (event) => {
		event.stopPropagation()
		event.preventDefault()
		this.setState({queryMusicName : event.target.value});
	}

	render()
	{
		// need to add list view component
		return (
			<div className="SearchComponent">
				<hr/>
				<Grid>
					<h3> Input music name to search </h3>
					<Form onSubmit={this.onSubmit}>
						<label>
							Music Name 
							<input type="text" onChange = {this.captureMusicName} />
						</label>
						<Button	bsStyle="primary" type="submit">
							Send it
						</Button>
					</Form>
					<hr/>
				</Grid>
			</div>
		);
	}
}

export default SearchComponent;
