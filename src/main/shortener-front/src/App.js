import React from "react";
import Header from "./component/Header";
import Contents from "./component/Contents";
import Footer from "./component/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * rsf, rsfp Function Component
 * rsc, rscp Stateless Component
 **/


function App() {
    return (
        <div>
            <Header text={"헤더 테스트 문구 입니다."}/>
            <Contents number={9} text={"입력된 텍스트"}/>
            <Footer/>
        </div>
    );
}

export default App;

/**
 *
 function App () {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/hello')
        .then(response => response.text())
        .then(message => {
          setMessage(message);
        });
  },[])
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">{message}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
  )
}

 */