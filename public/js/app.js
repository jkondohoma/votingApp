//create a component using class
//parent
class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  handleProductUpVote(productId) {
    // “First, we use map() to traverse the products array.
    // Importantly, map() returns a new array as
    //  opposed to modifying the array this.state.products.”

    // “Next, we check if the current product matches productId.
    // If it does, we create a new object, copying over the properties from
    //  the original product object. We then overwrite the votes property
    //  on our new product object. We set it to the incremented vote count.
    //   We do this using Object’s assign() method:”

    // “If the current product is not the one specified
    // by productId, we return it unmodified:”

    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        console.log(productId + " was upvoted.");
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });

    this.setState({
      products: nextProducts,
    });
  }

  render() {
    const products = this.state.products.sort((a, b) => b.votes - a.votes);
    const productComponents = products.map((product) => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));

    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

//child
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  handleUpVote() {
    this.props.onVote(this.props.id);
  }
  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

//create component using a function
function HelloWord() {
  return <p> Hello, World! </p>;
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
