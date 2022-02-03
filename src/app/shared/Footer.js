import React, { Component } from 'react';
class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-center justify-content-sm-between w-100">
            <div className="text-muted text-center text-sm-left d-block d-sm-inline-block d-sm-flex justify-content-center justify-content-sm-between">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block pointer">FAQ</span>
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block ml-3 pointer">Market</span>
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block ml-3 pointer">Docs</span>
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block ml-3 pointer">Support</span>
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block ml-3 pointer">Terms</span>
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block ml-3 pointer">Social</span>
            </div>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              <img src='/assets/footer__dot.png' className="mr-2" />Latest Block: 1234560
              </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;