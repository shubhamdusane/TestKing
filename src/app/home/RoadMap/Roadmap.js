import React from 'react';
import {readMapContentArray, quarter, color, releaseName} from './constant'

const Roadmap = () => {

    
    let releaseHeading = [],
        circle = [];

    releaseName.map((val, index) => {
        releaseHeading.push(<td style={{color : color[`q${index+1}`]}} key = {index}>{val}</td>)
        return
    })

    releaseName.map((val, index) => {
        circle.push(<td key={index} ><div style={{backgroundColor : color[`q${index+1}`]}} className = 'roadMapCirlce'/></td>)
        return
    })

    return (
        <div className="pt-5 pb-5">
        <div className = 'roadMap'>
            <div className = 'roadMapWrapper p-4'>
                <h1>USDAO Road Map </h1>
                <div className = 'tableWrapper'>
                <table>
                        <thead>
                            <tr className= 'headerQuater'>
                                {quarter.map((qua, index) =>(<th style={{'color' : color[qua.key]}} key={index} >{qua.value}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                        <tr className= 'circle'>{circle}</tr>
                            <tr className='releaseName'>
                                {releaseHeading}
                            </tr>
                            <tr className='roadMapContent'>
                                {readMapContentArray.map((content,index)=>(
                                <td style={{backgroundColor : color[`q${index+1}`]}} key={index}>
                                    <ul>
                                        {quarter.map((qua,key)=>{
                                            if(!content[qua.key]){
                                                return
                                            }
                                            return(
                                                content[qua.key].map((con,keys)=>(
                                            <li key ={con}>{con}</li>
                                        )))})}
                                    </ul>
                                </td>))}
                            </tr>
                        </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Roadmap