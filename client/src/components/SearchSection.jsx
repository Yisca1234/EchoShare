
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import '../styles/search.css'; 


const SearchSection = ({ onSearch }) => {
  //const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    
  };

  return (

    <div className='box10'>

      <h4 className="search"> search box on construction, be patient!</h4>
    </div>

    
    // <Form onSubmit={handleSearch} className="search">
    //   <InputGroup>
    //     <Form.Control
    //       type="text"
    //       placeholder="Search..."
    //       //value={searchTerm}
    //       //onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
    //     />
    //     <Button variant="primary" type="submit">
    //       <FaSearch /> {/* Search icon */}
    //     </Button>
    //   </InputGroup>
    // </Form>
  );
};

export default SearchSection;
