import React, {useState, useLayoutEffect}  from 'react'
import LayoutHeader from './LayoutHeader';
import LayoutSideBar from './LayoutSideBar';
import classNames from 'classnames/dedupe';


const AppLayout = (props) => {

    const {history, sideBarConfig = [], usmbalance, moduleName} = props;
    let [activeSideBar, setActiveSideBar] = useState(true)
    const [darkMode, setDarkMode] = useState(false),
    [show, setShow] = useState(false);
    
    const toggleSideNavBar = () => {

        if(activeSideBar){
            setActiveSideBar(false)
            document.querySelector('.card-c').classList.remove('activeSide-bar-container')

            document.querySelector('.sidebar-offcanvas-home').classList.add('activeSideBar');
        }else{
            setActiveSideBar(true)
            document.querySelector('.card-c').classList.add('activeSide-bar-container')

            document.querySelector('.sidebar-offcanvas-home').classList.remove('activeSideBar');
        }
    }


    React.useEffect(()=>{
        if(window.screen.width > 991){
            setActiveSideBar(true)
            document.querySelector('.sidebar-offcanvas-home').classList.remove('activeSideBar');
        }   
    },[])

    useLayoutEffect(() => {
        function updateSize() {
            if(window.screen.width > 991){
                setActiveSideBar(true)
                document.querySelector('.sidebar-offcanvas-home').classList.remove('activeSideBar');
            }
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
      }, []);
    
    return (
        <div className={classNames('', { dark: darkMode })}>
            <div className="side-nav-bar-container ">
            <LayoutHeader  history={history} usmbalance={usmbalance} show={show} setShow = {setShow}  mode={darkMode} setmode={setDarkMode} moduleName={moduleName}/>
                <div className = 'd-flex'>
                    <LayoutSideBar sideBarConfig={sideBarConfig}/>
                    <div className="card card-c activeSide-bar-container" >
                    <button className="navbar-toggler mobile-display" type="button" data-mdb-toggle="collapse"
                        data-mdb-target="#navbarToggleExternalContent2" aria-controls="navbarToggleExternalContent2"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i className={activeSideBar ? "fa fa-bars" : "fa fa-times"} onClick={toggleSideNavBar}></i>
                        </button>
                    {props.children}
                    </div>
            </div>

            </div>
        </div>
    )
    
}

export default AppLayout
