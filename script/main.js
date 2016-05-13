
var ProductCategoryRow=React.createClass({
	render:function(){
		return(<tr><th colSpan="2">{
			this.props.category}
			</th></tr>
		);
	}
});

var ProductRow=React.createClass({
	render:function(){
		var name=this.props.product.stocked?this.props.product.name:
		<span style={{color:'red'}}>
			{this.props.product.name}
		</span>;
	return(
		<tr>
		 <td>{name}</td>
		 <td>{this.props.product.price}</td>
		</tr>);
	}
});

var ProductTable=React.createClass({
	render:function(){
		var rows=[];
		var lastCategory=null;
		this.props.products.forEach(function(product){   

		if (product.name.indexOf(this.props.filterText)===-1||(!product.stocked&&this.props.inStockOnly))
		 {
			return;
		} 
			if(product.category!==lastCategory)    /*如果产品的分类不等于空*/
			{
				rows.push(<ProductCategoryRow category={product.category} key={product.category} />);  /*就把它加入到表头这一单元格中*/
			}
			rows.push(<ProductRow product={product} key={product.name}/>);   /*如果产品分类已经是空了，则就把它加入到表头下面的单元格中*/
			/*lastCategory=product.category;*/
		}.bind(this));
		return(
			<table>
			<thead>
			<tr>
			 <th>Name</th>
			 <th>Price</th>
			</tr>
			</thead>
			<tbody>
			{rows}
			</tbody>
			</table>);
	}
});

var SearchBar=React.createClass({
	handchange:function(){
		this.props.onUserInput(
			this.refs.filterTextInput.value,
			this.refs.inStockOnlyInput.checked)
	},


	render:function(){
		return(
		 <form>
		  <input type="text" placeholder="Search.."
		      value={this.props.filterText}
		      ref="filterTextInput"
		      onChange={this.handchange}

		  />
		  <p>
		   <input type="checkbox" checked={this.props.inStockOnly}
		   ref="inStockOnlyInput"
		   onChange={this.handchange}/>
		   only show product in stock
		  </p>
		  </form>
			);
	}
});

var FilterableProductTable=React.createClass({
	getInitialState(){
		return{
		filterText:'',
		inStockOnly:false
		};
	},
	handleUserInput:function(filterText,inStockOnly){
		this.setState({
			filterText:filterText,
			inStockOnly:inStockOnly
			
		})
	},
	render:function(){
		return(
			<div>
			 <SearchBar 
			 filterText={this.state.filterText}
			 inStockOnly={this.state.inStockOnly}
			
			 onUserInput={this.handleUserInput}
			 />
			 <ProductTable products={this.props.products}
			 filterText={this.state.filterText}
			 inStockOnly={this.state.inStockOnly}
			 />
			</div>);

	}
});
var PRODUCTS=[
	{category:'Sporting Goods',price:'$49.99',stocked:true,name:"Football"},
	{category:'Sporting Goods',price:'$9.99',stocked:true,name:'Baseball'},
	{category:'Sporting Goods',price:'$29.99',stocked:false,name:'Basketball'},
	{category:'Electronics',price:'$99.99',stocked:true,name:'ipod Touch'},
	{category:'Electronics',price:'$399.99',stocked:false,name:'iphone 5'},
	{category:'Electronics',price:'$1999.99',stocked:true,name:'Nexus 7'},
	{category:'Electronics',price:'$1999.99',stocked:true,name:'Huawei'},
	{category:'Electronics',price:'$1999.99',stocked:true,name:'Xioami'},
	{category:'Electronics',price:'$199.99',stocked:true,name:'Nuojiya'},
	{category:'clothes',    price:'$199.99',stocked:true,name:'Piaoliangnvxhneg'},
	{category:'clothes',    price:'$199.',stocked:true,name:'Senma'},
	{category:'clothes',    price:'$100',stocked:true,name:'handouyishe'},
	{category:'shoes',      price:'$200',stocked:true,name:'Tebu'},
	{category:'shoes',      price:'$400',stocked:true,name:'Lining'},
	{category:'book',      price:'$30',stocked:true,name:'Linux'},
	{category:'book',      price:'$48',stocked:true,name:'CSS'}

];


ReactDOM.render(
	<FilterableProductTable products={PRODUCTS}/>,
	document.getElementById('content')
	);