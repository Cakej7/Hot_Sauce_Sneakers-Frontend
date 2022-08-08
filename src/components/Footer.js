import React from "react";

const Footer = () => {
    return (
        <div id='footerContainer'>
            <div id='footer'>
                <h3>Hot Sauce Sneakers is a student project.</h3>
                <p>This site was built by
                    <a className="footerLinks" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/junwei-liang/">Junwei Liang,</a>
                    <a className="footerLinks" target="_blank" rel="noopener noreferrer" id="middleLink" href="https://www.linkedin.com/in/emilyrosemerritt/">Emily Merritt,</a>
                    <a className="footerLinks" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/alexis-muller/">Alexis Muller,</a>
                    and<a className="footerLinks" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jacob-peter-woehrle/">Jacob Woehrle</a>
                    as a capstone project for Fullstack Academy.</p>
            </div>
        </div>
        
    )
}

export default Footer;