import React from 'react'
import '../../contact.css';
import { Document, Page, pdfjs } from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const imageLength = 20;
const WhitePapper= () => {
    let card = [];
    for(let i = 1; i< 32;i++){
        let path = `/whitepaper/${i}.jpg`;
        card.push(<img src = {path}  alt='whitepaper' className='img-responsive'/>);
    }
    return card
}

const App = () => (
    <div className='whitepaperWrapper'>
        <div className='row'>
            
               
            
        <div class='col-md-12'>
        <table>
               { WhitePapper() }
            </table>
        </div>
        </div>
 </div>
);

export default App;
