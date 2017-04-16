import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Button, Well } from 'react-bootstrap';

import * as searchActions from '../../redux/search';
import Loader from '../Loader';
import API from '../../client-api';
import './HomePage.scss';

@connect(
  state => ({ ...state }),
  dispatch => ({ actions: bindActionCreators({ ...searchActions }, dispatch) })
)

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.renderBooks = this.renderBooks.bind(this);


    this.state = {
      a: 1,
    };
  }

  renderBooks(array) {
    return array.map(item => (
      <Well key={item.uuid} >
        Title: {item.title}
        <p className="trunc-text">
          {item.rightsStatement}
        </p>
        <Button
          onClick={() => {
            this.setState({
              showLoader: true
            });
            API.call(`api/v1/items/item_details/${item.apiUri.slice(item.apiUri.indexOf('mods/') + 5)}`)
            .then((result) => {
              this.setState({
                showLoader: false
              });
              this.props.actions.setSearchItem(result.nyplAPI.response);
              browserHistory.push('/details');
            });
          }}
        >
          More info
        </Button>
      </Well>
    ));
  }

  render() {
    return (
      <div>
        {this.renderBooks(this.props.search.books)}
        <Loader show={this.state.showLoader} />
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: React.PropTypes.shape({
    addBooks: React.PropTypes.func,
    setSearchItem: React.PropTypes.func,
  }),
  search: React.PropTypes.shape({
    books: React.PropTypes.array
  })
};
HomePage.defaultProps = {
  search: { books: [] },
  actions: {
    addBooks: () => {
      console.log('invoke addBooks'); // eslint-disable-line no-console
    },
    setSearchItem: () => {
      console.log('invoke setSearchItem'); // eslint-disable-line no-console
    }
  },
};

export default HomePage;
