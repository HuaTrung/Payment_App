import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { loadUser } from '../../../redux/actions/usertouser'

var store = require('../../../redux/store')
const axios = require('axios');
class UserToUser extends Component {
  componentDidMount() {
    // axios.get('/transaction/usertouser/listUserToUser')
    //   .then(function (response) {
    //     // handle success
    //     let details = [];
    //     // var empObj = JSON.parse(response.data);
    //     console.log(response.data[0].Name);
    //     // console.log(empObj);
    //     // var {dispatch}=this.props;
    //     store.dispatch({ type: 'LOAD_LIST_USERTOUSER', item: response.data });
    //     console.log(store.getState());
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    this.props.loadUser();

  }
  render() {
    const list = this.props.usertouser.listUsertoUser;
    const options =[];
    // console.log(list);
    list.forEach(element => {
      for(let i = 0 ;i<element.length;i++){
        options.push(<tr>
          <td>{element[i].Name}</td>
          <td>{element[i].Target}</td>
          <td>{element[i].Money}</td>
          <td>{element[i].Description}</td>
          <td>{element[i].DateGet}</td>
          <td>{element[i].UrlFull}</td>
        </tr>)
      }
    });
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Target</th>
                      <th>Money</th>
                      <th>Description</th>
                      <th>DateGet</th>
                      <th>URL_FULL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options}

                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usertouser: state.usertouserReducer,
})
// export default UserToUser;
export default connect(mapStateToProps, { loadUser })(UserToUser);

