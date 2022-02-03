import React, {memo} from 'react'; 





const quarter = [
    {key : 'q1', value : '2021-Q1'},
    {key : 'q2', value : '2021-Q2'},
    {key : 'q3', value : '2021-Q3'},
    {key : 'q4', value : '2021-Q4'},
    {key : 'q5', value : '2022-Q1'},
    {key : 'q6', value : '2022-Q2'},
    {key : 'q7', value : '2022-Q3'},
    {key : 'q8', value : '2022-Q4'},
];

const color = {q1 : '#253F68',
               q2 : '#4a5e7b',
               q3 : '#5388dc',
               q4 : '#3e759e',
               q5 : '#ff5722',
               q6 : '#cc4419',
               q7 : '#a7320d',
               q8 : '#8c2100',
        };

const releaseName = ['Alpha',
                     'Bravo',
                     'Charlie',
                     'Delta',
                     'Echo',
                     'Foxtrot',
                     'Golf',
                     'Hotel']


const readMapContentArray = [
    {q1 : ['USDAO Ideation & Research Start',
            'Development Kick Start',
            'USDAO Foundation Creation Start',
            '​Whitepaper and Technical Paper Created​']
    },
    {q2 : ['Legal Team Acquired',
            'Advisors Onboarded',
            'USDAO V1 Testnet : Rinkeby Testing',
            'Website Created',
            'Use Case Ecosystem Initiated']
    },
    {q3 : ['Website Launched',
            'USDAO V1 Testnet Launch',
            'Governance Policy Created',
            'DAOGOV Token : Testnet Launch']
    },
    {q4 : ['USDAO V1 Mainnet Launch',
            'USDAO Foundation Registered',
            'USDAO V2 Testnet: Multi Blockchain​',
            'USDAO V2: Polygon Launch',
            'USDAO v2: BSC Launch​​']
    },
    {q5 : ['DAOGOV Audit​',
           'DAOGOV Marketing​',
           'DAOGOV : Token Sale',
           'Use case: Funding Tree Launch​']
    },
    {q6 : ['Use case: Power Stake Launch​​',
           'Use case: Universal Swap​',
           'USDAO V2: Polkadot Launch​']
    },
    {q7 : ['Use case: NFT Marketplace Launch​​',
            'USDAO V2: Kasuma Launch',
            'USDAO Use Case: Remittance Launch​',
            'Use case: Yoga Nation Launch​​']
    },
    {q8 : ['Upgrading all the use cases to Polygon and Binance smart chain​​​',
            'USDAO V2: Algorand and Solana Launch​',
            'Upgrading all the uses cases to Solana, EOS, Polkadot ecosystem, and Algorand ​​']
    } 
];


const Table = () =>{

    let releaseHeading = [],
        circle = [];

    releaseName.map((val, index)=>{
        releaseHeading.push(<td style={{color : color[`q${index+1}`]}} key = {index}>{val}</td>)
    })

    releaseName.map((val, index)=>{
        circle.push(<td key={index} ><div style={{backgroundColor : color[`q${index+1}`]}} className = 'roadMapCirlce'/><div className='roadMapLine'></div></td>)
    })

    return (
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
    )
}




const roadMap = () =>{
    return (
        <div className = 'roadMap'>
            <div className = 'roadMapWrapper p-5'>
                <h1>USDAO Road Map </h1>
                <Table/>
            </div>
        </div>
    )
}

export default memo(roadMap);


