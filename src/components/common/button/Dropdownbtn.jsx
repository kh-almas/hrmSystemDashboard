import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {Button, ListGroup, ListGroupItem, Popover, PopoverBody, PopoverHeader} from "reactstrap";

const Dropdownbtn = ({data}) => {
  const [popover, setPopover] = useState(false)
  const DirectionToggle = ({links}) => setPopover(!popover);
  return (
      <>
        <Button color={"primary"} className="example-popover" id={"Popover-" + 6}>{"Select"}</Button>
        <Popover
            placement={"bottom"}
            isOpen={popover}
            target={"Popover-" + 6}
            toggle={DirectionToggle}>
          <PopoverHeader></PopoverHeader>
          <PopoverBody className="p-0">
              <ListGroup>
                  {
                      data.map(info =>
                          <>
                              {
                                  info.type === "link"
                                      ? <a href={info.url}><ListGroupItem>{info.text}</ListGroupItem></a>
                                      : <ListGroupItem onClick={info.url} style={{cursor: "pointer"}}>{info.text}</ListGroupItem>
                              }

                          </>)
                  }

              </ListGroup>
          </PopoverBody>
        </Popover>
      </>
  );
};

export default Dropdownbtn;
