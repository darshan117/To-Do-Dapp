import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowRight,PencilSquare } from 'react-bootstrap-icons';
import * as icons from 'react-bootstrap-icons';
import { Button ,Card,ListGroup,ListGroupItem,Modal,InputGroup,Form} from 'react-bootstrap'
import './App.scss'
/* New */
import { ethers, isAddress } from 'ethers'
import Todo from './../../artifacts/contracts/Lock.sol/Todo.json'
import CollapsibleExample from './navbar'

const lock = "0x5009566Ccec41e60d3F9dDDc4f9cbF039A2f9b42";
function UpdateModal({ show, onClose, onSave, index }) {
  const [update, setUpdate] = useState("");

  function handleUpdates(event) {
    setUpdate(event.target.value);
  }

  return (
    <Modal show={show} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update the task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup onInput={handleUpdates}>
          <InputGroup.Text id="basic-addon2">
            Edit the task {index}
          </InputGroup.Text>
          <Form.Control
            placeholder="What's next"
            aria-label="What's next"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onSave(update)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function App() {


  const [alltask , setTask] =useState([])
  const [events,setEvents] = useState("")
  let [counter,setCounter] = useState(null)
  const [update,setUpdate] =useState("")
  const [show, setShow] = useState(false);
  const [updateidx,setUpdateidx] = useState("")
  
  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);
  
  }



   function handleEvent(event){
      setEvents(event.target.value)
   }
   function handleUpdates(event){
    setUpdate(event.target.value)
   }
  const handleShowUpdate = (index) => {
    setShow(true);
    setUpdateidx(index); // Set the update index when opening the modal
  };
   async function  showlist(){
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(lock,Todo.abi,provider)
    let number_task = Number(await contract.taskCount())

    let all_tasks = [];
    for (let index = 0; index <= number_task; index++) {
      const element = await contract.tasks(index+1);
       
      all_tasks.push({content:element[1],status:element[2]})

    }
    console.log(counter)
    

    setTask(all_tasks)
    console.log(all_tasks)
    
    return number_task;
    
    
  }
  async function getSignature(){
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(lock,Todo.abi,signer)
    return contract
  }
  async function addtasks(message){
    
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(lock,Todo.abi,signer)
    console.log(await contract.addtask(message))
    provider.on("block", (blockNumber) => {
    showlist()
})  
  
    
  }
  async function iscompleted(_index){
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(lock,Todo.abi,signer)
    let toggled = await contract.completed(_index)
    console.log(toggled[1])
  }
    async function delete_task(_index){
    
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(lock,Todo.abi,signer)
    console.log(await contract.deletetask(_index))
    provider.on("block",(blockNumber) =>{
      console.log("transaction mined at",blockNumber)    
      showlist()
    })


  }
      async function update_task(_index,message){
    
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(lock,Todo.abi,signer)
    console.log(await contract.updatetask(_index,message))
    provider.on("block", (blockNumber) => {
    showlist()
    handleClose();
})  


  }
  const [count, setCount] = useState(0)

  return (
    <>.
    <div className="container whole ">
  <div className="row">

    <div className="navigation-bar">
      <CollapsibleExample /></div></div>
      <div className="row">
    <div className="wrapper-div">
      
      <div className="bodydiv">
<div className="card backdrop mb-3" >

  <div className="card-header header">#TODO</div>
  <div className="card-body">
    <h5 className="card-title">This is the decentralised way to create todo</h5>
    <InputGroup  className="my-5  add-task" size='lg' onInput={handleEvent}>
        
        <Form.Control
          placeholder="What's next"
          aria-label="What's next"
          aria-describedby="basic-addon2"
        />
        <Button onClick={(e)=>addtasks(events)} type='submit'>Add</Button>
      </InputGroup>
          
          <ListGroup  >

          <Button variant='primary' className="mx-4  reveal" onClick={(e)=>showlist()}>Reveal</Button>
            {alltask
            .map((task,index)=>(
              <>



              {task.content !== "" &&
              <div className="wrapper item my-2">
                <ListGroupItem className='main-task'>
              <div className="row">

              <div className="col-sm-1 checkbox">
               {task.status.toString()=="false" ?
                <Form.Check type='checkbox' key={index} id={`check-api-${task}}`} onChangeCapture={(e)=>iscompleted(index+1)}/>:<Form.Check key={index} type='checkbox' checked id={`check-api-${task}}`} onChangeCapture={(e)=>iscompleted(index+1)}/>}
                     
              </div>

              <div className="col-sm-9"><h3>{task.content}</h3></div>
                <div className="col-sm-2">
                  <Button variant="danger" className='mx-2' onClick={(e)=> delete_task(index+1)}><i class="bi bi-trash3-fill"></i></Button>
                                    <Button variant="primary" key={index}  onClick={(e)=> handleShowUpdate(index)} >
                                      
        <i className="bi bi-pencil-square"></i>
      </Button>

                </div>
                
                
                
                
               
          </div>
                </ListGroupItem>
                                            <Modal  show={show} key={index} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update the  task</Modal.Title>
        </Modal.Header>
        <Modal.Body>       
           <InputGroup  onInput={handleUpdates}>
        <InputGroup.Text key={index} id="basic-addon2">Edit the task  </InputGroup.Text>
        <Form.Control
          placeholder="What's next"
          aria-label="What's next"
          aria-describedby="basic-addon2"
        />
       
      </InputGroup></Modal.Body >
        <Modal.Footer>
          <Button variant="primary" onClick={(e)=>update_task(updateidx+1,update)} >
            Save Changes  
          </Button>
        </Modal.Footer>
      </Modal>
              </div>
              
              }
            </>
            ))}
            
          </ListGroup>
          
        
</div>
    
  </div>
</div>
      </div>
      </div>
      </div>
    </>
  )
}

export default App
