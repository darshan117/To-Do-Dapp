import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function PopoverElement() {
  return (
    <>
      {['bottom'].map((placement) => (
        <OverlayTrigger
          
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Header as="h3">Use this burner address</Popover.Header>
              <Popover.Body>
                <strong>492be60f389f9f47aa78b3d20ac2a1d99aea7fbd7e2d473bb212c0bb0326d854</strong> add this privatekey to your metamask in order to use the application as only owner of this address can use the app...
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Info <i className="bi bi-info-circle-fill"></i></Button>
        </OverlayTrigger>
      ))}
    </>
  );
}

export default PopoverElement;