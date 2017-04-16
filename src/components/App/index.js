import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Grid, Col, Form, FormControl, FormGroup, Button, Jumbotron } from 'react-bootstrap';

import API from '../../client-api';
import Loader from '../Loader';

import * as searchActions from '../../redux/search';

@connect(
  state => ({ ...state }),
  dispatch => ({ actions: bindActionCreators({
    ...searchActions }, dispatch) })
)

class App extends React.Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.OnChangeInput = this.OnChangeInput.bind(this);

    this.state = {
      searchText: 'default search text',
    };
  }

  OnChangeInput(event) {
    this.setState({ [event.target.id]: event.target.value, userFieldsChanged: true });
  }

  search() {
    this.setState({
      showLoader: true
    });

    if (browserHistory.getCurrentLocation().pathname !== '/') {
      browserHistory.push('/');
    }

    API.call(`api/v1/items/search?q=${this.state.searchText}&publicDomainOnly=true`)
    .then((result) => {
      this.setState({
        showLoader: false
      });
      if (result.nyplAPI.response.numResults > 0) {
        this.props.actions.setBooks(result.nyplAPI.response.result);
      } else this.props.actions.setBooks([]);
    });
  }

  render() {
    return (
      <Grid>
        <Jumbotron>
          <Form horizontal>
            <FormGroup controlId="searchText">
              <Col xs={10}>
                <FormControl
                  placeholder="cats"
                  value={this.state.searchText}
                  onChange={this.OnChangeInput}
                />
                <FormControl.Feedback />
              </Col>
              <Col xs={2}>
                <Button onClick={this.search}>search</Button>
                <Loader show={this.state.showLoader} />
              </Col>
            </FormGroup>
          </Form>
        </Jumbotron>
        {this.props.children}
      </Grid>
    );
  }
}

App.propTypes = {
  actions: React.PropTypes.shape({
    setBooks: React.PropTypes.func,
  }),
  children: React.PropTypes.shape(),
};
App.defaultProps = {
  actions: {
    setBooks: () => {
      console.log('invoke addBooks'); // eslint-disable-line no-console
    },
  },
  children: {},
  config: { appLanguage: 'en' }
};

export default App;
