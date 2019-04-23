import React from 'react';
import './Footer.css';
const Footer = () => {
    return(
    <footer className="footer pt-4">
    <div className="container pr-5 pl-5 containerFooter">
        <form>
            <div className="form-group">
                <label htmlFor="subscribeInput" className="col-form-label col-form-label-lg text-light">Subscribe for updates</label>
                <input type="email" className="form-control border border-white" id="subscribeInput" placeholder="Your email address"/>
                <button className="btn btn-outline-light my-0 w-100" type="button">Sign up</button>
            </div>
            <div>test
            </div>

        </form>
    </div>
    </footer>
    );
}

export default Footer;