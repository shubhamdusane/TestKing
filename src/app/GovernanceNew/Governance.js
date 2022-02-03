import React,{useState} from 'react';
import classNames from 'classnames/dedupe';
import GovernanceHeader from './GovernanceHeader';
import GovernanceSideBar from './GovernanceSideBar';
import GovernanceBody from './GovernanceBody';

const Governance = ({history}) => {

    const [darkMode, setDarkMode] = useState(false),
    [show, setShow] = useState(false);
    return (
        <div className={classNames('', { dark: darkMode })}>
            <div className="side-nav-bar-container ">
                <GovernanceHeader history={history} show={show} setShow = {setShow}  mode={darkMode} setmode={setDarkMode}/>
                <div className = 'd-flex'>
                    <GovernanceSideBar/>
                    <GovernanceBody/>
               </div>

            </div>
        </div>
    )
}

export default Governance


