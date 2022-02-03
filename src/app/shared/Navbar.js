import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { webContractSelector } from '../../redux/selectors';
// import { useHistory } from 'react-router-dom'

const Navbar = ({web}) => {
  // const history = useHistory()
const [address, setAddress] = React.useState(null);
const [wallet, setWallet] = React.useState(null);
  React.useEffect(()=>{
    fetchUserAddress();
    fetchWalletInfo();
  },[web])

  const fetchWalletInfo = () => {
    const wallet = localStorage.getItem('walletconnect');
    if(wallet) {
      setWallet(JSON.parse(wallet));
    }
  }

  const fetchUserAddress = async () => {
    if(web) {
      web.eth.getAccounts(async (err, accounts) => {
        if (err) {
            console.log(err);
        } else {
          setAddress(accounts[0]);
        }
    });
    }
  }

  // const logout = () => {
  //   localStorage.clear();
  //   history.push('/')
  // }
  // const toggleOffcanvas = () => {
  //   document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  // }
  // const toggleRightSidebar = () => {
  //   document.querySelector('.right-sidebar').classList.toggle('open');
  // }

  // const getNetwork = (id) => {
  //   if(id) {
  //     if(id == 1) {
  //       return 'Mainnet';
  //     }
  //     if(id == 3) {
  //       return 'Ropsten';
  //     }
  //     if(id == 4) {
  //       return 'Rinkeby';
  //     }
  //     if(id == 5) {
  //       return 'Goerli';
  //     }
  //     if(id == 2018) {
  //       return 'Dev';
  //     }
  //     if(id == 61) {
  //       return 'Ethereum Classic Mainnet';
  //     }
  //     if(id==62) {
  //       return 'Morden';
  //     }
  //     if(id == 63) {
  //       return 'Mordor';
  //     }
  //     if(id == 6) {
  //       return 'kotti';
  //     }
  //     if(id == 212) {
  //       return 'Astor';
  //     }
  //     if(id == 42) {
  //       return 'Kovan';
  //     }
  //   } else {
  //     return '';
  //   }
  // }


  return (
      <nav className=" fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper1 flex-grow d-flex align-items-stretch">
          <div className="container-fluid pt-3 pb-3 pr-5 pl-5 d-flex flex-row">
            <button className="navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
              <Link to="/" className="navbar__title">
                <img src={require('../../assets/images/Group12150.png')} className="img-fluid" alt="logo" />
              </Link>
            </button>
            <ul className="navbar-nav ml-5 mt-auto mb-auto mr-3 navbar__dash">

              <li className="nav-item nav__dash" >
                <Link to="/stakes" style={{ textDecoration: 'none', color: 'white' }}>Stake</Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-5 mt-auto mb-auto mr-3 navbar__dash">

              <li className="nav-item nav__dash" >
                <Link to="/governance" style={{ textDecoration: 'none', color: 'white' }}>Governance</Link>
              </li>
            </ul>
 
          </div>
        </div>
      </nav>
    );
}

const mapStateToProps = (state) => {
  const web = webContractSelector(state);
  return {
      web
  }
}

export default connect(mapStateToProps)(Navbar);