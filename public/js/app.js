//create a component using class
class ProductList extends React.Component {
  render() {
    return (
      <div className="ui unstackable items">
        Hello, friend! I am a basic React component.
      </div>
    );
  }
}

//create component using a function
function HelloWord(){

    return <p> Hello, World! </p>
}

ReactDOM.render( <ProductList />,document.getElementById('content'));