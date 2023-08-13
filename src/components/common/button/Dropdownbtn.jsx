import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Popover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";

const Dropdownbtn = ({ data }) => {
  const [popover, setPopover] = useState(false);
  const DirectionToggle = ({ links }) => setPopover(!popover);
  return (
    <>
      <Button
        color={"primary"}
        className="btn example-popover btn-square btn-sm"
        id={"Popover-" + 6}
      >
        {"Select"}
        <span>
          <i className="icofont icofont-swoosh-down"></i>
        </span>
      </Button>

      <Popover
        placement={"bottom"}
        isOpen={popover}
        target={"Popover-" + 6}
        toggle={DirectionToggle}
      >
        <PopoverHeader></PopoverHeader>
        <PopoverBody className="p-0">
          <ListGroup>
            {data.map((info) => (
              <>
                {info.type === "link" ? (
                  <a href={info.url}>
                    <ListGroupItem>{info.text}</ListGroupItem>
                  </a>
                ) : (
                  <ListGroupItem
                    onClick={info.url}
                    style={{ cursor: "pointer" }}
                  >
                    {info.text}
                  </ListGroupItem>
                )}
              </>
            ))}
          </ListGroup>
        </PopoverBody>
      </Popover>
    </>
  );
};

export default Dropdownbtn;
