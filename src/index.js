import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import './common/style/frame.css'


// class WelCome extends React.Component {
//   constructor(props) {
//     super(props);
//     let me = this;
//     me.state = { date: new Date() }

//     this.onClickRedirect = this.onClickRedirect.bind(this)
//   }

//   //第一次渲染生命周期
//   componentDidMount() {
//     this.clearTime = setInterval(() => {
//       console.log(this.state)
//       // this.setState({
//       //   date: new Date()
//       // })
//     }, 1000);
//   }

//   //销毁
//   componentWillUnmount() {
//     clearInterval(this.clearTime)
//   }

//   onClickRedirect(e) {

//     e.preventDefault();
//     // alert(e.target.outerHTML)

//     this.setState((state, props) => ({
//       date: new Date()
//     }))
//   }

//   render() {
//     if (!this.props.name) return null;
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//         <a href="http://www.baidu.com" onClick={this.onClickRedirect}>Redirect baidu</a>
//         {this.props.children}
//       </div>
//     );
//   }
// }

let list = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];
function Head1(props) {
  return (<div> <div><input type="text" onChange={props.inputChange} value={props.val} /></div>
    <div><label htmlFor="ck"><input id="ck" type="checkbox" />Only you choose</label></div>
  </div>)
}

function Body1(props) {
  // console.log(props.list)
  return (<div><ul>
    {props.list.map((item, idx) => {
      return <li key={idx}><h3>{item.category}--{item.name}</h3><p>{item.price}</p></li>
    })}

  </ul></div>);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.state = { searchText: 'ball' };
  }

  onInputChange(e) {

    let val = e.target.value;

    this.setState(state => ({
      searchText: val
    }))
  }
  render() {
    let newList = [],
      val = this.state.searchText;

    if (!val) { newList = list; }
    else {
      newList = list.filter(item => {

        return item.name.toLowerCase().includes(val && val.toLowerCase())
      });

      console.log(newList)
    }
    return (<div><Head1 inputChange={this.onInputChange} val={this.state.searchText} /><Body1 list={newList} /></div>)
  }
}

ReactDOM.render(<App className="container" />, document.getElementById("root"));