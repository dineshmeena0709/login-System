
import './App.css';
import {Route,Routes,Navigate} from "react-router-dom"
import Mainpage from './conmponents/Mainpage';
import Register from './conmponents/Register';
import Signin from './conmponents/Signin'
function App() {
  // const user = localStorage.getItem("token")

return (
  <>
  <div className="App">
  <Routes>
 <Route path="/Mainpage" exact element={<Mainpage/>}/>
<Route path='/Register' exact element={<Register/>} />
<Route path='/Signin' exact element={<Signin/>} />
<Route path='/' exact element={<Navigate replace to="/Signin"/>} />
</Routes>
   </div>

   </>

  
  );

}

export default App;
