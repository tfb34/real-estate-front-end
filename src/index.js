
import React from "react";
import ReactDOM from "react-dom";
import './myStyle.css';

/*const Index = () => {
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));*/

class ListingType extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			//type: 'buy', default value
			isBuy: this.props.type === 'buy' ? true:false, 
			isRent: this.props.type === 'rent' ? true:false,
			isSold: this.props.type === 'sold' ? true:false
		};
		this.handleClick = this.handleClick.bind(this); //needs binding cause we need access to state. we need to bind state to this instance
	}

	handleClick(newType){//Given the id of new checked
		let t = this.props.type;
		let cType = `is${t.charAt(0).toUpperCase()+t.slice(1)}`;
		let nType = `is${newType.charAt(0).toUpperCase()+newType.slice(1)}`;

		this.setState(state => ({
			[cType]: false,
			[nType]: true
		}));
		this.props.onListingTypeChange(newType);
	}
	toggleDropdown(id){
		let el = document.getElementById(id);
		el.classList.toggle("show");
	}

	render(){
		return(
			<div id="listingTypeOption" className="formOption">
				<a onClick={(e) => this.toggleDropdown('listingtype-menu',e)} className="formButton">Listing Type</a>
				<div id="listingtype-menu" className="dropdown">
					<h4 className="title">Listing Type</h4>
					<div>
						<a onClick={(e) => this.handleClick('buy', e)} className={this.state.isBuy ? 'checked': ''}>Buy</a>
						<a onClick={(e) => this.handleClick('rent', e)} className={this.state.isRent ? 'checked': ''}>Rent</a>
						<a onClick={(e) => this.handleClick('sold', e)} className={this.state.isSold ? 'checked': ''}>Sold</a>
					</div>
				</div>
			</div>
		);
	}
}


class FilterableHomeTable extends React.Component{
	constructor(props){
		super(props);

		this.handleListingTypeChange = this.handleListingTypeChange.bind(this);
		this.handleBedroomChange = this.handleBedroomChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.updateMinPriceChange = this.updateMinPriceChange.bind(this);
		this.updateMaxPriceChange = this.updateMaxPriceChange.bind(this);
		this.handleSortChange = this.handleSortChange.bind(this);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.state = {
			filterText: 'Neighborhood',
			isAnyPrice: true,
			minPrice: 'No Min',
			maxPrice: 'No Max',
			isAllBeds: true,
			minBeds: 0, // stays
			isAllHomeTypes: true,
			homeType: [],
			listingType: 'buy', // stays
			sortType: 'Featured'
		};
	}

	handleListingTypeChange(newType){
		this.setState({
			listingType:newType
		});
	}

	handleBedroomChange(newMinBeds){
		this.setState({
			minBeds: newMinBeds
		})
	}

	handlePriceChange(type, newPrice){
		type === 'min' ? this.updateMinPriceChange(newPrice) : this.updateMaxPriceChange(newPrice);
	}

	updateMinPriceChange(newPrice){
		this.setState({
			minPrice: newPrice
		});
	}
	updateMaxPriceChange(newPrice){
		this.setState({
			maxPrice: newPrice
		});
	}

	handleSortChange(event){
		this.setState({
			sortType: event.target.value
		});
	}

	handleFilterTextChange(event){
		this.setState({
			filterText:event.target.value
		});
	}

	render(){
		//if change in state return something?
	/*	return (
			<div>
				<SearchBar
					filterText = {this.state.filterText}
					isAnyPrice = {this.state.isAnyPrice}
				/>
				<HomeTable
					homes = {this.props.homes}
				/>
			</div>
		);*/
		return(
			<div>
				<ListingType 
					type={this.state.listingType}
					onListingTypeChange={this.handleListingTypeChange}/>
				<NumBedroomPreference 
					minBeds = {this.state.minBeds}
					onBedroomChange = {this.handleBedroomChange}  
				/>
				<PricePreference
					minPrice = {this.state.minPrice}
					maxPrice = {this.state.maxPrice}
					onPriceChange = {this.handlePriceChange}
				/>
				<SortPreference
					sortType = {this.state.sortType}
					onSortChange = {this.handleSortChange}
				/>
				<SearchInput
					filterText = {this.filterText}
					onTextChange = {this.handleFilterTextChange}
				/>
			</div>
		);
	}
	 
}
/*<input value={this.props.filterText} type="text" name="filterText" onChange={this.props.onTextChange}>*/
class SearchInput extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<input value={this.props.filterText} type="text" placeholder="Enter something" name="filterText" onChange={this.props.onTextChange}/>
		)
	}
}

class SortPreference extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		return(
			<select value={this.props.sortType} name="sort" id="sortOption" onChange={this.props.onSortChange}>
				<option value="featured">Sort: Featured</option>
				<option value="newest">Sort: Newest</option>
			</select>
		)
	}
}

//try updating parent. perhaps update in props will rerender this component. otherwise create state
class PricePreference extends React.Component{
	constructor(props){
		super(props);

	}

	toggleDropdown(id){
		let el = document.getElementById(id);
		el.classList.toggle("show");
	}

	handleChange(type,event){
		this.props.onPriceChange(type,event.target.value);
	}

	render(){
		return(
			<div id="priceOption" className="formOption">
				<a onClick={(e) => this.toggleDropdown('price-menu', e)} className="formButton">Any Price</a>
				<div id="price-menu" className="dropdown">
					<h4 className="title">PRICE</h4>
					<select value={this.props.minPrice} name="minPrice" onChange={(e) => this.handleChange('min',e)}>
						<option value="No Min">No Min</option>
						<option value="10000">$10K</option>
					</select>
					<span>&ndash;</span>
					<select value={this.props.maxPrice} name="maxPrice" onChange={(e) => this.handleChange('max',e)}>
						<option value="No Max">No Max</option>
						<option value="10000">$10K</option>
					</select>
				</div>
			</div>
		)
	}
}

class NumBedroomPreference extends React.Component{
	constructor(props){
		super(props); // this.props.minBeds

		this.handleClick = this.handleClick.bind(this);

		let beds = this.props.minBeds;

		this.state = {
			is0: beds === 0 ? true:false,
			is1: beds === 1 ? true:false,
			is2: beds === 2 ? true:false,
			is3: beds === 3 ? true:false,
			is4: beds === 4 ? true:false
		};
	}

	handleClick(newNumBeds){

		let cType = `is${this.props.minBeds}`;
		let nType = `is${newNumBeds}`;
		this.setState(state => ({
			[cType]: false,
			[nType]: true
		}));
		this.props.onBedroomChange(newNumBeds);
	}

	toggleDropdown(id){
		let el = document.getElementById(id);
		el.classList.toggle("show");
	}

	render(){
		return(
		<div id="bedroomOption" className="formOption">
			<a onClick={(e) => this.toggleDropdown('bedroom-menu', e)} className="formButton">BEDROOMS</a>
			<div id="bedroom-menu" className="dropdown">
				<h4 className="title">BEDROOMS</h4>
					<div>
						<a id="zero" onClick={(e) => this.handleClick(0,e)} className={this.state.is0 ? 'checked': ''}>Studio+</a>
						<a id="one" onClick={(e) => this.handleClick(1,e)} className={this.state.is1 ? 'checked': ''}>1+</a>
						<a id="two" onClick={(e) => this.handleClick(2,e)} className={this.state.is2 ? 'checked': ''}>2+</a>
						<a id="three" onClick={(e) => this.handleClick(3,e)} className={this.state.is3 ? 'checked': ''}>3+</a>
						<a id="four" onClick={(e) => this.handleClick(4,e)} className={this.state.is4 ? 'checked': ''}>4+</a>
					</div>
			</div>
		</div>
		)
	}
}

ReactDOM.render(
	<FilterableHomeTable />,
	document.getElementById('filterable-home-table-container')
);