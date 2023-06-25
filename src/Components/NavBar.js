
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { useNavigate} from 'react-router-dom';


function ContainerOutsideExample(props) {
    const navigate=useNavigate();
    return (

        <Navbar expand="lg" className={`bg-${props.mode}  d-flex justify-content-between align-items-center`}>

            <Navbar.Brand className={`ms-5 font-size homePage text-${props.mode==='light'?'dark':'light'}`} onClick={() => navigate("/")}>Note IT</Navbar.Brand>
            <div className='Navbuttons'>
                <div class="form-check form-switch switch">
                    <input class="form-check-input" onClick={props.toggleMode} type="checkbox" defaultChecked role="switch" id="flexSwitchCheckDefault" />
                    <label class={`form-check-label text-${props.mode==='light'?'dark':'light'} `}  for="flexSwitchCheckDefault">Dark Mode</label>
                </div>
                <div className='homeBtn '>{props.elementProp}</div>
            </div>
        </Navbar>

    );
}

export default ContainerOutsideExample;