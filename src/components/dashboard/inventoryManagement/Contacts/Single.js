import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Popover,
  PopoverBody,
} from "reactstrap";
import axios from "../../../../axios";
import Swal from "sweetalert2";

const Single = ({ index, item, isUpdate, setIsUpdate, howManyItem, currentPage }) => {
  const [popover, setPopover] = useState(false);


    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`inventory-management/contacts/delete-contact/${id}`)
                    .then(info => {
                        if(info?.status == 200)
                        {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your file has been deleted.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        setIsUpdate(!isUpdate);
                    })
                    .catch(e => {
                        if(e?.response?.data?.body?.message?.sqlState === "23000")
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `Can not delete shift, if there have any attendance in this shift`,
                            })
                        }
                        // if (!empty(e?.response?.data?.body?.message?.details[0].message))
                        // {
                        //     Swal.fire({
                        //         icon: 'error',
                        //         title: 'Oops...',
                        //         text: `${e?.response?.data?.body?.message?.details[0].message}`,
                        //     })
                        // }
                    })
            }
        })
    };

  return (
    <tr>
      <td>{ parseInt(howManyItem) * (parseInt(currentPage)-1) + index+1 }</td>
      {/*{console.log(item)}*/}
      <td><img style={{borderRadius: "10px"}} width={"50"} height={"50"} src={`http://localhost:5000/inventory-management/contacts/image/${item?.id}`} alt="img"/></td>
      <td>{item?.name}</td>
      <td>{item?.email}</td>
      <td>{item?.mobile}</td>
      <td>{item?.pay_term}</td>
      <td>{item?.tax_number}</td>
      <td>
          <div className="d-flex justify-content-center">
              <Link to={`${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/edit-contacts/${item?.id}`} className="btn me-2" style={{backgroundColor: "skyblue", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                  <i className="icofont icofont-pencil-alt-5  rounded" style={{backgroundColor: "skyblue", color: "#ffffff",}}></i>
              </Link>
              <button onClick={() => handleDelete(item?.id)} className="btn" style={{backgroundColor: "#ff3a6e", color: "#ffffff", padding: "7px 13px", borderRadius: "5px"}}>
                  <i className="icofont icofont-trash rounded" style={{backgroundColor: "#ff3a6e", color: "#ffffff",}}></i>
              </button>
          </div>
        {/*<Button color={"primary"} className="btn example-popover btn-square btn-sm" id={"Popover-" + 6}>*/}
        {/*  {"Select"}*/}
        {/*  <span>*/}
        {/*    <i className="icofont icofont-swoosh-down"></i>*/}
        {/*  </span>*/}
        {/*</Button>*/}

        {/*<Popover placement={"bottom"} isOpen={popover} target={"Popover-" + 6} toggle={DirectionToggle} style={{ minWidth: "150px" }}>*/}
        {/*  <PopoverBody className="p-0">*/}
        {/*    <ListGroup>*/}
        {/*      <ListGroupItem>*/}
        {/*        <Link to={`${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/edit-contacts/${item?.id}`}>*/}
        {/*          Edit*/}
        {/*        </Link>*/}
        {/*      </ListGroupItem>*/}
        {/*      <ListGroupItem style={{ cursor: "pointer" }} onClick={handleDelete}>*/}
        {/*        Delete*/}
        {/*      </ListGroupItem>*/}
        {/*      <ListGroupItem>*/}
        {/*        <Link to={`${process.env.PUBLIC_URL}/dashboard/inventory-management/contacts/view-contacts/${item?.id}`}>*/}
        {/*          View*/}
        {/*        </Link>*/}
        {/*      </ListGroupItem>*/}
        {/*    </ListGroup>*/}
        {/*  </PopoverBody>*/}
        {/*</Popover>*/}
      </td>
      <td></td>
    </tr>
  );
};

export default Single;
