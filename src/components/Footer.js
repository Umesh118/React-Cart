import React from 'react'

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p className='footer-links'>
                <a href='https://www.github.com/Umesh118' target="_blank">
                    View Source On Github
                </a>
                <span></span>
                <a href='' target="_blank">
                    Need any help?
                </a>
                <span></span>
                <a href='' target="_blank">
                    Say Hi on twitter
                </a>
                <span></span>
                <a href='' target="_blank">
                    Read My Blog
                </a>
                <span></span>
            </p>
            <p>
                &copy; {currentYear} <strong>Buy It</strong>
            </p>
        </footer>
    )
}

export default Footer;
