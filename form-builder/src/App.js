import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Navbar />} />
            {/* <Route index element={<FormCustom />} />
            <Route path="inputs" element={<Lists />} /> */}
            {/* <Route path="posts" element={<Posts />} />
            <Route path="posts/:id" element={<Post />} />
            <Route path="posts/add-or-edit-post" element={<AddOrEditPost />} />
            <Route path="category" element={<AllCategories />} />
            <Route path="category/:id" element={<Gallery />} />
            <Route path="*" element={<Error404 />} /> */}
            {/* <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserProfileContainer />} /> */}
            {/* <Route path="counter" element={<Counter />} /> */}

          {/* </Route> */}
        </Routes>
    </div>
  );
}

export default App;
