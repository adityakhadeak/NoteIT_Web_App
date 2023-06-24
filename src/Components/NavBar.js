
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
function ContainerOutsideExample(props) {
    return (

        <Navbar expand="lg" className="bg-dark  d-flex justify-content-between align-items-center">

            <Navbar.Brand className='ms-5 font-size' href="#">Note IT</Navbar.Brand>
            <div className='Navbuttons'>
                <div class="form-check form-switch switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label class="form-check-label " for="flexSwitchCheckDefault">Dark Mode</label>
                </div>
                <div className='homeBtn '>{props.elementProp}</div>
            </div>
        </Navbar>

    );
}

export default ContainerOutsideExample;