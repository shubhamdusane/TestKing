import React, {useEffect, useRef} from 'react'

function Cookie() {
    const inputEl = useRef(null);
    useEffect(() => {
        inputEl.current.focus();
        window.scrollTo(0, 0);
      }, [])
    return (
        <div className="cookies p-5" style= {{backgroundColor: 'white'}}>
             <input ref={inputEl} style={{opacity: 0, width: '0px', height: '0px'}}/>
            <h2 className="text-center" style={{color: 'black'}}>Cookies</h2>
            <ul className="cookies_list">
                <li>1. Introduction </li>
                <li>1.1 Our website uses cookies.  </li>
                <li>1.3 Insofar as those cookies are not strictly necessary for the provision of our website and services, we will ask you to consent to our use of cookies when you first visit our website.  </li>
                <li>2. Credit  </li>
                <li>2.1 This document was created using a template from SEQ Lega ( https://seqlegal.com )  </li>
                <li>3. About cookies  </li>
                <li>3.1 A cookie is a file containing an identifier (a string of letters and numbers) that is sent by a webserver to a web browser and is stored by the browser. The identifier is then sent back to the servereach time the browser requests a page from the server.  </li>
                <li>3.2 Cookies may be either "persistent" cookies or "session" cookies: a persistent cookie will bestored by a web browser and will remain valid until its set expiry date, unless deleted by the userbefore the expiry date; a session cookie, on the other hand, will expire at the end of the usersession, when the web browser is closed.  </li>
                <li>3.3 Cookies do not typically contain any information that personally identifies a user, but personal information that we store about you may be linked to the information stored in and obtained fromcookies.  </li>
                <li>4. Types of Cookies  </li>
                <li>4.1 Cookies can be used for the following purposes:  </li>
                <li>Strictly Necessary Cookies These cookies are necessary for the website to function and cannot be switched off in oursystems. They are usually only set in response to actions made by you which amount to a requestfor services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.These cookies do not store any personally identifiable information.  </li>
                <li>Analytics Cookies These cookies allow us to count visits and traffic sources, so we can measure and improvethe performance of our site. They help us know which pages are the most and least popular and seehow visitors move around the site. All information these cookies collect is aggregated and thereforeanonymous. If you do not allow these cookies, we will not know when you have visited our site.  </li>
                <li>Functional Cookies These cookies enable the website to provide enhanced functionality and personalization. Theymay be set by us or by third party providers whose services we have added to our pages. If you donot allow these cookies, then some or all of these services may not function properly.  </li>
                <li>Targeting Cookies These cookies may be set through our site by our advertising partners. They may be used bythose companies to build a profile of your interests and show you relevant adverts on other sites.They do not store directly personal information but are based on uniquely identifying your browserand internet device. If you do not allow these cookies, you will experience less targeted advertising.  </li>
                <li>5. Managing cookies  </li>
                <li>5.1 Most browsers allow you to refuse to accept cookies and to delete cookies. The methods fordoing so vary from browser to browser, and from version to version. You can however obtainup-to-date information about blocking and deleting cookies via these links:  </li>
                <li>(a) https://support.google.com/chrome/answer/95647 (Chrome);  </li>
                <li>(b) https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences  (Firefox);  </li>
                <li>(c) https://www.opera.com/help/tutorials/security/cookies/  (Opera);  </li>
                <li>(d) https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies (Internet Explorer);  </li>
                <li>(e) https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac#:~:text=In%20the%20Safari%20app%20on,interact%20with%20the%20trackers"%20websites.  (Safari); and  </li>
                <li>(f) https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy  (EDGE196).  </li>
                <li>5.2 Blocking all cookies will have a negative impact upon the usability of many websites.  </li>
                <li>5.3 If you block cookies, you will not be able to use all the features on our website.  </li>
                <li>6. Updates to This Cookie Policy  </li>
                <li>6.1 We may change this Cookie Policy at any time. Please review the “LAST UPDATED” legendat the beginning of this policy to see the last revision date to this Cookie Policy. Any changes in thisCookie Policy will become effective when the revised Cookie Policy is available on or through theSite.  </li>
                <li>7. Our details  </li>
                <li>7.1 This website is owned and operated by USDAO Foundation: A DAO LLC Company.  </li>
                <li>7.2 You can contact us via mail at:  </li>
                <li>USDAO  </li>
                <li>2150 Town Square Pl #200  </li>
                <li>Sugar Land Tx 77479  </li>
            </ul>
        </div>
    )
}

export default Cookie
