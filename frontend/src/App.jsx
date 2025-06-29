
import { BrowserRouter , Route , Routes } from 'react-router' ;
import Signup from './pages/Signup' ;
import Signin from './pages/Signin' ;
import Blog from './pages/Blog' ;
import CreateBlog from './pages/CreateBlog' ;
import FullBlog from './pages/FullBlog' ;
import UpdateBlog from './pages/UpdateBlog';
const App = () => {
  return (

   <>

   <BrowserRouter>

   <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/createblog" element={<CreateBlog />} />
    <Route path="/blog/fullblog/:id" element={<FullBlog  />} />
    <Route path="/updateblog/:id" element={<UpdateBlog  />} />
   </Routes>
   
   </BrowserRouter>
   
   </>
  )
}

export default App