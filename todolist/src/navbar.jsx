import Container from 'react-bootstrap/Container';
import {Button,Nav} from 'react-bootstrap';
import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.scss'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import PopoverElement from './popover';
function CollapsibleExample() {
      const [wallet,setWallet] = useState(null);
        const [hasProvider, setHasProvider] = useState(null)
      async function connect(){

    const metaprovider =  await detectEthereumProvider(

    )
            const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )
    setWallet(await metaprovider.request({method: "eth_requestAccounts"}))
    console.log(metaprovider)
            const balance = ethers.formatEther(await metaprovider.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    }))
    console.log(balance)
    
    setHasProvider(metaprovider.isMetaMask);
    return metaprovider



  }
  return (
    <div className="navbody">
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand className='app'href="#home" color='white'>To Do Dapp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='app' href="https://github.com/darshan117"color='white'><i class="bi primary bi-github"></i></Nav.Link>
            <Nav.Link className='app' href="https://app.ens.domains/n3rdzoid.eth">n3rdzoid.eth</Nav.Link> 
            <PopoverElement />




          </Nav>
          <Nav>
            <a className="nav-link mx-2 app" id="nav-link-tag"href="#deets">Decentralised</a>
            <Nav.Link eventKey={2} href="#memes">
                {wallet === null?       <Button className='' onLoad={(e)=>connect()}>
          Connect  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png'/>
        </Button>:<strong className='connected'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill svg" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>  
</svg> Connected</strong>}
                          
 
        
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default CollapsibleExample;