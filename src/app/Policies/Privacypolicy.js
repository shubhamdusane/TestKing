import React, {useEffect, useRef} from 'react'


function Privacypolicy() {
    const inputEl = useRef(null);
    useEffect(() => {
        inputEl.current.focus();
        window.scrollTo(0, 0);
      }, [])
    return (
        <div className="cookies p-5"  style= {{backgroundColor: 'white'}}>
            <input ref={inputEl} style={{opacity: 0, width: '0px', height: '0px'}}/>
            <h2 className="text-center" style={{color: 'black'}}>Privacy Policy</h2>
            <p style={{color: 'black'}}>
                This privacy policy ("Policy") describes how The USDAO Foundation, PTE LTD, a Wyoming DAO LLC, together with its affiliates (the "Company"), collect, use, disclose, store, retain, process and share personal information of consumer users of this website, www.usdao.io (the “Site”). This Policy also applies to any of our other websites that post this Policy. This Policy does not apply to websites that post different statements. 
            </p>
            <h4 style={{color: 'black'}}>WHAT WE COLLECT </h4>
            <p style={{color: 'black'}}>We get information about you in a range of ways. </p>
            <ul className="cookies_list">
                <li>Information You Give Us. In order to verify your identity and protect against fraud, among other reasons discussed below, we, or a third-party service hired by us, may collect your name, postal address, email address, phone number, username, password, demographic information (such as your gender and occupation) as well as other information you directly give us on our Site, including but not limited to, birth date, photograph, driver’s license, social security number, or other government issued ID. With regard to institutional clients, we or a third-party service hired by us, may collect the following information: entity name; state documents evidencing the entity’s existence (e.g. articles of incorporation, certificate of formation, etc.); Employer Identification Number (“EIN”); beneficial owners’ names, identification information, email addresses, phone numbers, and proofs of identity. </li>
                <li>Financial Data. In addition to identify verification, we or a third-party service hired by us, may collect various information regarding your finances through third parties in order to be able to perform the transactions you request on the platform and to ensure compliance with regulatory requirements (e.g., anti-money laundering laws) and our own internal policies; in order for this to function, we must share certain of your Personal Data with these third parties. The information we receive from these third parties may include accounts you hold, balances, and transactions. </li>
                <li>Information We Get From Others. We may get information about you from other sources. We may add this to information we get from this Site. </li>
                <li>Marketing Data. We collect and process your preferences in receiving marketing from us, your email address, including hashed identifiers derived from email addresses for the purposes of cross-device tracking for targeted advertising, and where you may have seen Company advertisements. </li>
                <li>Information Automatically Collected. We automatically log information about you and your computer. For example, when visiting our Site, we log your computer operating system type, browser type, browser language, the website you visited before browsing to our Site, pages you viewed, how long you spent on a page, access times and information about your use of and actions on our Site. </li>
                <li>Cookies. We may log information using "cookies." Cookies are small data files stored on your hard drive by a website. We may use both session Cookies (which expire once you close your web browser) and persistent Cookies (which stay on your computer until you delete them) to provide you with a more personal and interactive experience on our Site. This type of information is collected to make the Site more useful to you and to tailor the experience with us to meet your special interests and needs. Please see our Cookie Policy for additional information. You can also adjust your browser settings to disable cookies, but it may affect your ability to use the Service and our website. </li>
                <li>Location Information. To provide the Services, we must collect information regarding your location. Your attempt to interfere with our collection of your location may cause you to lose access to the Services. </li>
                <li>Trade, Order, and Transaction Information. When you use our Services, we may collect and store information related to your orders, trades, transfers, balance information, deposits, withdrawals, payments, and other trading activity related to our Services. We may also collect information when you participate in any interactive features of the Services (such as API keys, cryptocurrency exchange digital asset allocations, configuration settings, and user referrals). </li>
            </ul>
            <h4>USE OF PERSONAL INFORMATION  </h4>
            <p style={{color: 'black'}}>We may use your personal information as follows:  </p>
            <ul className="cookies_list">
                <li>We sometimes share your information internally between employees and contractors of the Company, in particular in connection with activities undertaken jointly or in common with such group members and/or provide IT and system administration services and undertake management reporting. </li>
                <li>We do not sell, trade or otherwise transfer your Personal Data to third parties other than third parties who assist us in operating our Service, maintaining compliance with relevant laws, conducting our business or supporting our members, or providing you with applications or services integrated via our API </li>
                <li>We may share personal information with your consent. For example, you may let us share personal information with others for their own marketing uses. Those uses will be subject to their privacy policies. </li>
                <li>We may share personal information when we do a business deal, or negotiate a business deal, involving the sale or transfer of all or a part of our business or assets. These deals can include any merger, financing, acquisition, or bankruptcy transaction or proceeding. </li>
                <li>We may share personal information for legal, protection, and safety purposes. </li>
                <li>We may share information to comply with laws. </li>
                <li>We may share information to respond to lawful requests and legal processes. </li>
                <li>We may share information to protect the rights and property of the Company, our agents, customers, and others. This includes enforcing our agreements, policies, and terms of use. </li>
                <li>We may share information in an emergency. This includes protecting the safety of our employees and agents, our customers, or any person. </li>
                <li>We may share information with those who need it to do work for us. </li>
                <li>We may also share aggregated and/or anonymized data with others for their own uses. </li>
                <li>Third parties. If you authorize applications or third-party integrations on or using our Service, these parties may receive detailed information about your account, your use of the Service, transaction history or even the ability to take actions on your behalf. Information collected by these applications or third-party integrations are subject to their terms and policies and are required by contract by Company to maintain the confidentiality and security of your Personal Data. </li>
            </ul>
            <h4>ADVERTISING AND ANALYTICS SERVICES PROVIDED BY OTHERS </h4>
            <ul className="cookies_list">
                <li>
                We may allow others to provide analytics services and serve advertisements on our behalf across the internet and in applications. These entities may use cookies, web beacons, device identifiers and other technologies to collect information about your use of the Services and other websites and applications, including your IP address, web browser, mobile network information, pages viewed, time spent on pages or in apps, links clicked and conversion information. This information may be used by Company and others to, among other things, analyze and track data, determine the popularity of certain content, deliver advertising and content targeted to your interests on our Services and other websites and better understand your online activity. For more information about interest-based ads, or to opt out of having your web browsing information used for behavioral advertising purposes, please visit www.aboutads.info/choices. 
                </li>
            </ul>
            <h4>TRANSFER OF DATA OUTSIDE OF US  </h4>
            <ul className="cookies_list">
                <li>USDAO is headquartered in the United States. Many of our affiliates and third-party service providers are based outside the US, so processing of your Personal Data may involve a transfer of your Personal Data outside the US and may be maintained or accessed in servers or files located in countries outside the US. </li>
                <li>By voluntarily providing your Personal Data on or via this website or app, you consent to its transfer, processing and storage in the United States or other countries outside the US, some which have not been deemed by the US to have “adequate” privacy safeguards. </li>
                <li>Whenever we transfer any Personal Data outside the US, we will put in place an adequate level of protection to ensure that any such transfers comply and are consistent with applicable US data protection laws. </li>
            </ul>
            <h4>USER INFORMATION RETENTION.  </h4>
            <ul className="cookies_list">
                <li>We retain the information described in this Privacy Policy for a reasonable amount of time as determined by us, even after you deactivate or cancel your account with the Company, to enforce the terms of our User Agreement and to comply with applicable laws and regulations. </li>
                <li>When it is no longer necessary to retain your information, we will securely delete it, subject to applicable law and regulations. </li>
                <li>In some circumstances, we may anonymize your information (so that it can no longer be associated with you) for research or statistical purposes in which case we may use this information indefinitely without further notice to you. </li>
                <li>If you request that we stop sending you marketing materials, we will continue to keep a record of your contact details and appropriate information to enable us to comply with your request not to be contacted by us. </li>
                
            </ul>
            <h4>INFORMATION CHOICES AND CHANGES  </h4>
            <ul className="cookies_list">
                <li>Our marketing emails tell you how to “opt-out.” If you opt out, we may still send you non-marketing emails. Non-marketing emails include emails about your accounts and our business dealings with you.</li>
                <li>You may send requests about personal information to our Contact Information below. You can request to change contact choices, opt-out of our sharing with others, and update your personal information. </li>
                <li>You can typically remove and reject cookies from our Site with your browser settings. Many browsers are set to accept cookies until you change your settings. If you remove or reject our cookies, it could affect how our Site works for you. </li>
                <li></li>
            </ul>
            <h4>INDIVIDUAL RIGHTS IN CERTAIN JURISDICTIONS   </h4>
            <ul className="cookies_list">
                <li>If you are located in certain jurisdictions, the applicable legislation allows you some or all of the following rights with respect to your Personal Data: </li>
                <li>To access the Personal Data we maintain about you. We will provide you free of charge with a copy of your Personal Data, but we may charge you a fee to cover our administrative costs if you request further copies of the same information. </li>
                <li>To be provided with information about how we process your Personal Data. This will include information on the categories of data, the sources from which it originated, the purpose and legal basis for the processing, the expected retention period, and the safeguards regarding data transfers to other jurisdictions, subject to the limitations set out in applicable laws and regulations. </li>
                <li>To correct your Personal Data. You have the right to ask us to rectify Personal Data you think is inaccurate or incomplete. In some cases, you will need to make certain of these changes yourself by using the tools we provide in the Data Sources. </li>
                <li>To have your Personal Data erased. You have the right to ask us to delete your Personal Data. In some cases, you will need to do the deletion yourself using the tools we provide in the Data Sources. We will decline your request for deletion if processing your Personal Data is necessary: (i) for the continued performance of a contract, (ii) to comply with our legal obligation; (iii) in pursuit of a legal action; (iv) to detect and monitor fraud, or (v) for the performance of a task in the public interest. </li>
                <li>To object to how we process your Personal Data. Where we process your Personal Data based on our legitimate interest (or that of a third party), you have the right to object to this processing on grounds relating to your particular situation if you feel it impacts on your fundamental rights and freedoms. We will decline your request where we have a compelling legitimate grounds for the processing which override your rights and freedoms, or where the processing is in connection with the establishment, exercise or defence of legal claims. </li>
                <li>To be informed about direct marketing. You have the right to request us to tell you how your Personal Data has been shared, if at all, with third parties for the third parties’ direct marketing purposes. </li>
                <li>To stop your Personal Data being used for direct marketing purposes. At your request, we will stop using your Personal Data for the purpose of direct marketing. </li>
                <li>If you want to stop us from contacting you in connection with marketing communications, please email us at the email address specified below. </li>
                <li>To restrict how we process your Personal Data. At your request, we will limit the processing of your Personal Data if: </li>
                <li>you dispute the accuracy of your Personal Data; </li>
                <li>your Personal Data was processed unlawfully and you request a limitation on processing, rather than the deletion of your Personal Data; </li>
                <li>we no longer need to process your Personal Data, but you require your Personal Data in connection with a legal claim, or </li>
                <li>you object to the processing pending verification as to whether an overriding legitimate ground for such processing exists. </li>
                <li>We may continue to store your Personal Data to the extent required to ensure that your request to limit the processing is respected in the future. </li>
                <li>The right to data portability. You have the right to receive your Personal Data in a structured, commonly used and machine-readable format, if: </li>
                <li>the processing of your Personal Data is based on your consent or required for the performance of a contract; or </li>
                <li>the processing is carried out by automated means. </li>
                <li>Please note information might already be available to you via the Data Sources </li>
                <li>To withdraw any consent that you gave us to process your Personal Data. You have the right to withdraw any consent you may have previously given us at any time. </li>
                <li>To complain to a supervisory authority. If you are not satisfied with our response, you have the right to complain to or seek advice from a supervisory authority and/or bring a claim against us in any court of competent jurisdiction. </li>
                <li>To exercise the above rights, please contact us at the email address specified below. We will consider and process your request within a reasonable period of time. Please be aware that under certain circumstances, or in relation to certain types of data, including pseudonymous data, the applicable legislation may limit your exercise of these rights. </li>
                <li>CONTACT INFORMATION. We welcome your comments or questions about this privacy policy. You may contact us at support@usdao.io </li>
                <li>CHANGES TO THIS PRIVACY POLICY. We reserve the right to amend this Privacy Policy at any time. Amendments to this policy shall be posted to our website, along with a link to the last revised Privacy Policy. At any time, you may request a copy of this policy or any previously issued policies. </li>
                
            </ul>
        </div>
    
        )
}

export default Privacypolicy
