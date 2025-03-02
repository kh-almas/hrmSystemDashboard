import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button, Popover, PopoverBody, PopoverHeader} from "reactstrap";

const DataTable = ({
  getAllData,
  handleDelete,
  editLink ,
  toggleUpdateModal,
  setValueForEdit,
  baseForDelete,
  statusData,
}) => {
  const [data, setData] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [groupingItem, setGrouping] = useState("");

  const [popover, setPopover] = useState('');
  const Toggle = (id) => {
    console.log('id', id);
    if (id !== popover){
      setPopover(id);
    }else {
      setPopover('');
    }

  };

  useEffect(() => {
    setData([]);
    setData(getAllData);
  }, [getAllData]);

  useEffect(() => {
    if (data?.length > 0) {
      const objectKeys = Object.keys(data[0]);

      objectKeys.map((singleData) => {
        function splitString(inputString) {
          const wordsArray = inputString.split("_");
          const longWords = [];
          const singleChars = [];

          wordsArray.forEach((word) => {
            if (word.length === 1) {
              singleChars.push(word);
            } else {
              longWords.push(word);
            }
          });

          const capitalizedLongWords = longWords.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)
          );

          return { longWords: capitalizedLongWords.join(" "), singleChars };
        }
        const { longWords, singleChars } = splitString(singleData);
        const newObj = {
          header: longWords,
          accessorKey: singleData,
        };

        singleChars?.map((s_char) => {
          if (s_char == "m") {
            newObj.aggregationFn = "max";
            newObj.AggregatedCell = ({ cell, table }) => (
              <>
                Oldest by{" "}
                {
                  table.getColumn(cell.row.groupingColumnId ?? "").columnDef
                    .header
                }
                :{" "}
                <Box
                  sx={{
                    color: "info.main",
                    display: "inline",
                    fontWeight: "bold",
                  }}
                >
                  {cell.getValue()}
                </Box>
              </>
            );
          }
          if (s_char == "a") {
            newObj.aggregationFn = "mean";
            newObj.AggregatedCell = ({ cell, table }) => (
              <>
                Average by{" "}
                {
                  table.getColumn(cell.row.groupingColumnId ?? "").columnDef
                    .header
                }
                :{" "}
                <Box sx={{ color: "success.main", fontWeight: "bold" }}>
                  {cell.getValue()?.toLocaleString?.("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Box>
              </>
            );
          }
          if (s_char == "i") {
            newObj.Cell = ({ cell }) => (
              <img
                src={`http://localhost:5000/${cell.getValue()}`}
                alt="User Avatar"
                style={{ width: "20px", height: "20px", borderRadius: "50%" }}
              />
            );
          }
          if (s_char == "s") {
            setTableInfo((prevInfo) => {
              if (
                !prevInfo.some(
                  (item) => item.accessorKey === newObj.accessorKey
                )
              ) {
                return [...prevInfo, newObj];
              }
              return prevInfo;
            });
          }
          if (s_char == "g") {
            setGrouping(singleData);
          }
        });
      });
    }
  }, [data]);

  // const FindMax = useMemo(
  //     () => data.reduce((acc, curr) => Math.max(acc, curr.age), 0),
  //     [],
  // );

  return (
    <>
      {groupingItem ? (
        <MaterialReactTable
          columns={tableInfo}
          data={data}
          enableGrouping
          enableStickyHeader
          initialState={{
            density: "compact",
            expanded: true,
            grouping: [groupingItem],
            pagination: { pageIndex: 0, pageSize: 10 },
            // sorting: [{ id: 'state', desc: false }],
          }}
          muiToolbarAlertBannerChipProps={{ color: "secondary" }}
          muiTableContainerProps={{ maxHeight: 700 }}
          enableRowActions
          renderRowActions={({ row, table }) => (
            <Box sx={{display: "flex", flexWrap: "nowrap", justifyContent: "center", alignItems: "center",}}>
                {editLink ? (
                  <Link
                    to={`${process.env.PUBLIC_URL}${editLink}${row?.original?.id}`}
                  >
                    <EditIcon />
                  </Link>
                ) : (
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setValueForEdit(row);
                      toggleUpdateModal();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              <IconButton
                color="error"
                onClick={() => {
                  console.log(
                    "row?.original?.primary_id",
                    row?.original,
                    row?.original?.[baseForDelete]
                  );
                  handleDelete(
                    !baseForDelete ? row?.original?.primary_id : row?.original?.[baseForDelete]
                  );
                }}
              >
                <DeleteIcon />
              </IconButton>

              {
                statusData ?
                    <>
                <span
                    onClick={() => Toggle(`Popover-${!baseForDelete ? row?.original?.primary_id : row?.original?.[baseForDelete]}`)}
                    id={`Popover-${!baseForDelete ? row?.original?.primary_id : row?.original?.[baseForDelete]}`}>
                  <i className="fa fa-cogs"></i>
                </span>
                      <Popover
                          placement={'bottom'}
                          isOpen={popover === `Popover-${!baseForDelete ? row?.original?.primary_id : row?.original?.[baseForDelete]}` ? true : false}
                          target={`Popover-${!baseForDelete ? row?.original?.primary_id : row?.original?.[baseForDelete]}`}
                          toggle={Toggle}
                      >
                        {/*{console.log('asdfghdflk', `Popover-${!baseForDelete ? row?.original?.primary_id : row?.original?.[baseForDelete]}`)}*/}
                        <PopoverHeader style={{backgroundColor: "lightgray", color: 'darkgray'}}>{'Payment Status'}</PopoverHeader>
                        <PopoverBody style={{padding: '8px'}}>
                          {
                            statusData?.map(item => <>
                              <div style={{borderBottom: '1px solid gray', marginBottom: '4px', width: '120px', cursor: 'pointer', padding: '4px 10px', marginX: 'auto' }} onClick={() => console.log(item)}>{item}</div>
                            </>)
                          }
                        </PopoverBody>
                      </Popover>
                    </>
                    : ''
              }


            </Box>
          )}
        />
      ) : (
          <div style={{height: "100vh"}}>
            <div className="d-flex align-items-center justify-content-center">
              <div className="loader-box">
                <div className="loader">
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                  <div className="line bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
};

export default DataTable;
