// import React, { Component } from 'react';
// import { TouchableOpacity,ScrollView, View, Text, FlatList } from 'react-native';
// import { searchTransaction } from '../../../no-redux/search';
// import { formatCurrency } from "../../../validations/util";

// import { connect } from "react-redux";
// import { GLOBAL } from "../../../config/language";

// class FlatListItem extends Component {
//   render() {
//     return(
//       <View style = {{ height: 50, flex: 1}}>
//         <View style = {{ flex:3 }}>
//           <Text>1fdfsfdsdf</Text>
//           <Text>sdfsfsf</Text>
//         </View>
//         <Text style= {{ flex: 1 }} >- 1,166,666</Text>
//       </View>
//     )
//   }
// }

// class Transaction extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       listTransaction: [
//         {
//           "key": "123",
//           "data": "hello"
//         },
//         {
//           "key": "456",
//           "data": "hi"
//         }
//       ],
//       valueSearch: ""
//     };
    
//     // searchTransaction().then(status => {
//     //   this.setState({
//     //     listTransaction: status.listTransaction
//     //   });
//     // });
//   }

//   render() {
//     let { lang } = this.props.lang;
//     const { listTransaction } = this.state;
//     return (
//       <View style = {{ flex:1 }}>
//         <View style = {{ height:45, backgroundColor: "#1aa3ff",justifyContent: "center",alignItems: "center" }}>       
//           <Text style = {{ textAlign : "center", color: "white", fontWeight:"500", fontSize: 18}} >Transaction History</Text>
//         </View>
//         <ScrollView style = {{ flex: 1 }}>
//           <FlatList 
//             style = {{ flex: 1 }}
//           //  refreshing = { true }
//           //  onRefresh = { () => alert("ok") }
//             data = { listTransaction }
//             // keyExtractor = { (item,index) => item.key}
//             renderItem = { ({item, index}) => {
//               return(<FlatListItem  item = {item} index = {index}/>)
//             }}/>
//         </ScrollView>
//       </View>
//     );
//   }
// }
// const mapStateToProps = state => ({
//   lang: state.langReducer
// });
// export default connect(mapStateToProps)(Transaction);