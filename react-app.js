class App extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			businesses: []

		}

		// You can use var app = this; for the axios call to make it work by setting this.setState to app.setState

this.axios = this.axios.bind(this)
	}

	render() {
		return(
			<div>
				<Input search={this.axios} />
				<YelpResults results={this.state.businesses}/>
			</div>

		)

	}

	axios(location, term){
		axios.get("https://yelp-search.herokuapp.com/search", {
			params: {
				location: location,
				term: term

			}

		}).then(function(response){

			this.setState({businesses: response.data.businesses})

		}.bind(this))

	}

}

function YelpResults(props) {

	console.log(props.results);
	let results = props.results.map(function(result, index){
		return(
			<div key={index}>
				<div> {result.name}</div>
				<img src={result.image_url} alt=""/>
			</div>
		)
	})

	return (
		<div> It's working
			<div> {results}</div>
		</div>

	)

}


class Input extends React.Component {
	constructor(props) {
		super(props)
		this.state ={
			term:"",
			location:""

		}

		this.changeTerm = this.changeTerm.bind(this)
		this.changeLocation = this.changeLocation.bind(this)
		this.search = this.search.bind(this)
	}
	render(){

		return(
			<div>
				<input onChange ={this.changeTerm}/>
				<input onChange ={this.changeLocation} />
				<button onClick={this.search}> Search </button>
			</div>

		)

	}
	changeTerm(event){
		this.setState({term: event.target.value})


	}
	changeLocation(event){
		this.setState({location: event.target.value})

	}
	search(){
		this.props.search(this.state.location, this.state.term)

	}

}

ReactDOM.render(
	<App />,
	document.getElementById("react")
)
