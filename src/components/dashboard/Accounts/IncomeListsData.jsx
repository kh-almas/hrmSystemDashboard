import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Popover,
  PopoverBody,
} from "reactstrap";

const IncomeListsData = () => {
  const [popover, setPopover] = useState(false);
  const DirectionToggle = () => setPopover(!popover);
  return (
    <tr>
      <td>{"1"}</td>
      <td>{"Mr. X"}</td>
      <td>{"$ 100.00"}</td>
      <td>{"dfgdfg"}</td>
      <td>{"15 July, 2023"}</td>
      <td>
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
          style={{ minWidth: "150px" }}
        >
          <PopoverBody className="p-0">
            <ListGroup>
              <ListGroupItem>
                <Link
                  to={`${process.env.PUBLIC_URL}/dashboard/accounts/add-income`}
                >
                  Edit
                </Link>
              </ListGroupItem>
              <ListGroupItem style={{ cursor: "pointer" }}>
                Delete
              </ListGroupItem>
            </ListGroup>
          </PopoverBody>
        </Popover>
      </td>
      <td></td>
    </tr>
  );
};

export default IncomeListsData;
