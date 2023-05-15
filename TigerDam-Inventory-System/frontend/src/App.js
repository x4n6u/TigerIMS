import { BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import Items from "./pages/Items";
import DashBoard from "./pages/DashBoard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Options from "./pages/Options";
import History from "./pages/History";
import Login from "./pages/Login";
import withAuth from "./middleware/auth";
// import MyDropzone from './components/MyDropzone';

function App() {
  //Auth
  const AuthDashboard = withAuth(DashBoard);
  const AuthItems = withAuth(Items);
  const AuthOrders = withAuth(Orders);
  const AuthUsers = withAuth(Users);
  const AuthOptions = withAuth(Options);
  const AuthHistory = withAuth(History);

  return (
    <div className="App">
      <HashRouter>
      {/* <BrowserRouter> */}
        <div className="pages">
          <Routes>
            <Route path="/" element={<AuthDashboard />} />
            <Route path="/Item" element={<AuthItems />} />
            <Route path="/Order" element={<AuthOrders />} />
            <Route path="/Users" element={<AuthUsers />} />
            <Route path="/Options" element={<AuthOptions />} />
            <Route path="/History" element={<AuthHistory />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      {/* </BrowserRouter> */}
      </HashRouter>
    </div>
    
  );
}

export default App;
