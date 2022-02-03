import React, {useState} from 'react';
import { Menu, Layout  } from 'antd';
import { MailOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css';
const { SubMenu } = Menu;
const { Sider, Content } = Layout;


const SlidingTabsDemo =()=>  {
    const [content, setContent] = useState(
        <div className="d-flex w-100 flex-wrap">
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Funding tree</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Powerstake</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Fincop</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Alpha City</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Namasa</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Matataki</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Mantra DAO</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Coreto</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>MobiFi</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                </div>
    );
    // let content ;

    

    const handleClick = (e) => {
        if(e.key == 1)
        {
            setContent(
                <div className="d-flex w-100 flex-wrap">
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Funding tree</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Powerstake</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Fincop</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Alpha City</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Namasa</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Matataki</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Mantra DAO</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Coreto</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>MobiFi</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
            
        }
        if(e.key == 2){
            setContent(
                <div className="d-flex w-100 flex-wrap">
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Funding tree</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Powerstake</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>NFT universe</h4>
                            <p className="useCases_boxes_para">
                                Two sentence description or
                                lead in goes in this space.
                            </p>
                            <div className="d-flex flex-wrap">
                                <p className="slider_Submenu_category">DEFI</p>
                                <p className="slider_Submenu_category">governance</p>
                            </div>
                            {/* <div className="d-flex flex-wrap">
                                <img src="/assets/tweet2.png" style={{width: '20px', marginRight: '5px'}}/>
                                <img src="/assets/domain.png" style={{width: '20px'}}/>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        }
        };
  
    // const { mode } = this.state;
    return (
      <div className="usecases_slider">
            <Layout>
                <Sider>
                    <Menu
                        onClick={handleClick}
                        style={{ width: '100%', height: '100%' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" icon={<MailOutlined />} title="DAPPS">
                            <Menu.Item key="1">NFT</Menu.Item>
                            <Menu.Item key="2">GAMING</Menu.Item>
                            <Menu.Item key="3">NFT</Menu.Item>
                            <Menu.Item key="4">B2B</Menu.Item>
                            <Menu.Item key="5">REALESTATE</Menu.Item>
                        </SubMenu>
                        {/* <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu> */}
                    </Menu>
                </Sider>
                <Content style={{background: 'white'}}>{content}</Content>
            </Layout>
          
        {/* <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 'auto' }}>
            <TabPane tab="Tab 1" key="1" style={{ height: 'auto' }}>
                <div className="d-flex w-100 flex-wrap">
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane tab="Tab 2" key="2" style={{ height: 'auto' }}>
            <div className="d-flex w-100 flex-wrap">
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane tab="Tab 3" key="3" style={{ height: 'auto' }}>
            <div className="d-flex w-100 flex-wrap">
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane tab="Tab 4" key="4" style={{ height: 'auto' }}>
            <div className="d-flex w-100 flex-wrap">
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane tab="Tab 5" key="5" style={{ height: 'auto' }}>
            <div className="d-flex w-100 flex-wrap">
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                    <div className="d-flex useCases_boxes">
                        <div>
                            <img src="/assets/asset.png" className="img-fluid" style={{width: '100px'}}/>
                        </div>
                        <div>
                            <h4>Title Here</h4>
                            <p style={{fontSize: '10px', lineHeight: '10px'}}>Two sentence description or lead in 
                                goes in this space.</p>
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
       */}
      </div>
    
    );
}

export default SlidingTabsDemo;