import {
    Nav,
    Navbar as NavbarRS,
    NavbarBrand,
    NavLink as NavLinkRS,
    NavItem,
} from 'reactstrap'
import { Link } from '../common/link/link.component'

const Navbar: React.FC = () => {
    return (
        <div>
            <NavbarRS color="dark" dark expand="md">
                <NavbarBrand style={{ paddingLeft: '15px' }}>
                    <Link to="/">video-app</Link>
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLinkRS>
                            <Link to="/">Add</Link>
                        </NavLinkRS>
                    </NavItem>
                    <NavItem>
                        <NavLinkRS>
                            <Link to="/videos/1">All videos</Link>
                        </NavLinkRS>
                    </NavItem>
                </Nav>
            </NavbarRS>
        </div>
    )
}

export default Navbar
