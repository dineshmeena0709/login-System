
import './App.css';
import { Routes,Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Mainpage from './conmponents/Mainpage';
import Register from './conmponents/Register';
import Signin from './conmponents/Signin'
import UpdateProfile from './conmponents/UpdateProfile';
// import Updatepage from './conmponents/Updatepage';
// import Dashboard from "./conmponents/Dashboard"


function App() {
  const user = localStorage.getItem("token")

return (
 <>
   <div className="App"> 
  <Routes>
    
    
 <Route path="/UpdateProfile" exact element={<UpdateProfile/>}/>
 {/* <Route path="/Updatepage" exact element={<Updatepage/>}/> */}
 {/* <Route path="/dashboard" exact element={<Dashboard/>}/> */}
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
