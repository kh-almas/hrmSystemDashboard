import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Popover,
  PopoverBody,
} from "reactstrap";
import axios from "../../../../axios";

const Single = ({ index, item, isUpdate, setIsUpdate }) => {
  const [popover, setPopover] = useState(false);

  const DirectionToggle = () => setPopover(!popover);

  const handleDelete = async () => {
    const res = await axios.delete(
      `inventory-management/contacts/delete-contact/${item.id}`
    );
    console.log(res);
    setIsUpdate(!isUpdate);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item?.id}</td>
      <td>{item?.name}</td>
      <td>{item?.email}</td>
      <td>{item?.mobile}</td>
      <td>{item?.pay_term}</td>
      <td>{item?.tax_number}</td>
      <td>{item?.status}</td>
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
                  to={`${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/edit-contacts/${item?.id}`}
                >
                  Edit
                </Link>
              </ListGroupItem>
              <ListGroupItem
                style={{ cursor: "pointer" }}
                onClick={handleDelete}
              >
                Delete
              </ListGroupItem>
              <ListGroupItem>
                <Link
                  to={`${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/view-contacts/${item?.id}`}
                >
                  View
                </Link>
              </ListGroupItem>
            </ListGroup>
          </PopoverBody>
        </Popover>
      </td>
      <td></td>
    </tr>
  );
};

export default Single;
