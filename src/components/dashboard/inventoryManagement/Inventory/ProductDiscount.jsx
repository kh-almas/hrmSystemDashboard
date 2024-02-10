import React, { useEffect, useState } from "react";
import { Card, Collapse } from "reactstrap";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import GetAllProductDiscount from "../../../common/Query/inventory/GetAllProductDiscount";
import Breadcrumb from "../../../common/breadcrumb";
import FilesComponent from "../../../common/filesComponent/FilesComponent";
import AddProductDiscount from "./Form/AddProductDiscount";

// ///////////////////////////////////
// MaterialReactEditableTableExample.jsx
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  darken,
  lighten,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MaterialReactTable,
  createRow,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import GetAllBranch from "../../../common/Query/hrm/GetAllBranch";
import GetAllSKUForSelect from "../../../common/Query/inventory/GetAllSKUForSelect";
// -----------------------------------------

const ProductDiscount = () => {
  const [showFromForAdd, setShowFromForAdd] = useState(false);
  const [allProductDiscount, setAllProductDiscount] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [valueForEdit, setValueForEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [
    allProductDiscountStatus,
    allProductDiscountReFetch,
    allProductDiscountData,
    allProductDiscountError,
  ] = GetAllProductDiscount();
  const [selectedBranch, setSelectedBranch] = useState({});
  const [batchNo, setBatchNo] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [data, setData] = React.useState([]);
  const [branch, setBranch] = useState([]);
  const [date, setDate] = useState("");
  const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] =
    GetAllBranch();
  const [allSkuStatus, allSkuReFetch, allSku, allSkuError] =
    GetAllSKUForSelect();


    const [creatingRowIndex, setCreatingRowIndex] = useState();
    const [validationErrors, setValidationErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [defaultBranch, setDefaultBranch] = useState(new Date());

  const isDarty = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    setAllProductDiscount(allProductDiscountData?.data?.body?.data);
  }, [allProductDiscountData]);

  const updateToggle = () => {
    setEditModal(!editModal);
  };

  // console.log('allProductDiscountData',allProductDiscount)

  const handleDelete = (primary_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/inventory-management/product/discount/delete/${primary_id}`)
          .then((info) => {
            if (info?.status == 200) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your file has been deleted.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            allProductDiscountReFetch();
          })
          .catch((e) => {
            if (e?.response?.data?.body?.message?.sqlState === "23000") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Can not delete Stock Adjustment.`,
              });
            }
          });
      }
    });
  };




  useEffect(() => {
    setBranch(allBranch?.data?.body?.data?.data);
  }, [allBranch]);

  useEffect(() => {
    const allProduct = allSku?.data?.body?.data;
    let finalArray = [];
    allProduct?.map((item) => {
      let initialObj = {
        id: item.id,
        label: `${item.name} > ${item.sku} > ${item.category_name} > ${item.brand_name} > ${item.model_name}`,
      };

      finalArray.push(initialObj);
    });

    setData(finalArray);
  }, [allSku]);




  //---------------------------------

  // Assuming `branch` is an array of objects with `id` and `name` properties
  const mapBranchOptions = (branch) => {
    return branch?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  };

  const mapProductsOptions = (data) => {
    return data?.map((item) => ({
      label: item?.label,
      value: item?.id,
    }));
  };


  function findUserInTree(managerId, users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === managerId) {
        return users[i];
      }
      if (users[i].subRows) {
        const found = findUserInTree(managerId, users[i].subRows);
        if (found) return found;
      }
    }
    return null;
  }
  const validateRequired = (value) => !!value.length;

  function validateUser(user) {
    return {
      branch_id: !validateRequired(user.branch_id) ? "Branch is Required" : "",
      product_s: !validateRequired(user.product_s) ? "Product is Required" : "",
    };
  }

  //CREATE hook (post new user to api)
  function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        console.info("create user", user);
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(["users"], (_prevUsers) => {
          const prevUsers = JSON.parse(JSON.stringify(_prevUsers));
          newUserInfo.subRows = [];
          if (newUserInfo.managerId) {
            const manager = findUserInTree(newUserInfo.managerId, prevUsers);
            if (manager) {
              manager.subRows = [
                ...(manager.subRows || []),
                {
                  ...newUserInfo,
                  id: `${manager.id}.${(manager.subRows?.length || 0) + 1}`,
                },
              ];
            }
          } else {
            prevUsers.push({
              ...newUserInfo,
              id: `${prevUsers.length + 1}`,
            });
          }
          return [...prevUsers];
        });
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }

  //READ hook (get users from api)
  function useGetUsers() {
    return useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        try {
          // Make the API request using axios
          const response = await axios.get(
            "/inventory-management/product/discount"
          );
          // Extract data from the response
          const allProductDiscountData = response?.data?.body?.data;

          console.log("allProductDiscountData", allProductDiscountData);
          // Simulate delay with setTimeout
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Return the user data
          return allProductDiscountData;
        } catch (error) {
          // Handle errors here (e.g., logging, error states, etc.)
          console.error("Error fetching users:", error);
          throw new Error("Failed to fetch users");
        }
      },
      refetchOnWindowFocus: false,
    });
  }



  //UPDATE hook (put user in api)
  function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        console.log("update user", user);
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(["users"], (prevUsers) => {
          let user = findUserInTree(newUserInfo.id, prevUsers);
          user = { ...user, ...newUserInfo };
          return [...prevUsers];
        });
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }

  //DELETE hook (delete user in api)
  function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId) => {
        console.info("delete user", userId);
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (userId) => {
        queryClient.setQueryData(["users"], (prevUsers) => {
          const newUsers = JSON.parse(JSON.stringify(prevUsers));
          //remove user
          const user = findUserInTree(userId, newUsers);
          if (user) {
            const manager = findUserInTree(user.managerId, newUsers);
            if (manager) {
              manager.subRows = manager.subRows?.filter(
                (subUser) => subUser.id !== user.id
              );
            } else {
              return newUsers.filter((user) => user.id !== userId);
            }
          }
          return [...newUsers];
        });
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'date_s_g',
        header: 'Date',
        muiEditTextFieldProps: {
          // You can add any props specific to date editing here
          type: 'date', // This will render a date picker
          required: true,
          error: !!validationErrors?.date_s_g,
          helperText: validationErrors?.date_s_g,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              date_s_g: undefined,
            }),
        },
      },


      {
        accessorKey: "name_s",
        header: "Branch",
        editVariant: "select",
        editSelectOptions: mapBranchOptions(branch), // Map branch data to options
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.branch_id,
          helperText: validationErrors?.branch_id,
        },
      },

      // {
      //   accessorKey: "product_s",
      //   header: "Product",
      //   editVariant: "select",
      //   editSelectOptions: mapProductsOptions(data), // Map branch data to options
      //   muiEditTextFieldProps: {
      //     select: true,
      //     error: !!validationErrors?.product_s,
      //     helperText: validationErrors?.product_s,
      //     defaultValue: "product_s", 
      //   },
      // },
      

      {
        accessorKey: "product_s",
        header: "Product",
        editVariant: "select",
        editSelectOptions: mapProductsOptions(data),
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.product_s,
          helperText: validationErrors?.product_s,
          value: (row) => row.original.product_s, // Add this line to get the current value
        },
      },

      {
        accessorKey: "purchase_price_s",
        header: "Purchase Price",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.purchase_price_s,
          helperText: validationErrors?.purchase_price_s,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              purchase_price_s: undefined,
            }),
        },
      },

      {
        accessorKey: "selling_price_s",
        header: "Selling Price",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.selling_price_s,
          helperText: validationErrors?.selling_price_s,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              selling_price_s: undefined,
            }),
        },
      },

      {
        accessorKey: "discount_type_s",
        header: "Discount Type",
        editVariant: "select",
        editSelectOptions: ["Percent", "Fixed"],
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },

      {
        accessorKey: "discount_percent_s",
        header: "Discount Percent",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.discount_percent_s,
          helperText: validationErrors?.discount_percent_s,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              discount_percent_s: undefined,
            }),
        },
      },

      {
        accessorKey: "discount_value_s",
        header: "Discount Value",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.discount_value_s,
          helperText: validationErrors?.discount_value_s,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              discount_value_s: undefined,
            }),
        },
      },
    ],
    [branch, validationErrors, mapProductsOptions, data]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, row, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser({ ...values, managerId: row.original.managerId });
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };
  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    // enableGrouping: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableColumnPinning: true,
    enableEditing: true,
    enableExpanding: true,
    positionCreatingRow: creatingRowIndex, //index where new row is inserted before
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: (theme) => ({
        backgroundColor: darken(
          lighten(theme.palette.background.paper, 0.1),
          row.depth * (theme.palette.mode === "dark" ? 0.2 : 0.1)
        ),
      }),
    }),
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, staticRowIndex, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

         <Tooltip title="Add Subordinate">
          <IconButton
            onClick={() => {
              setCreatingRowIndex((staticRowIndex || 0) + 1);
              table.setCreatingRow(
                createRow(
                  table,
                  {
                    date_s_g: "",
                    // id: null,
                    branch_id: "",
                    product_s: "",
                    purchase_price_s: "",
                    selling_price_s: "",
                    discount_type_s: "",
                    discount_value_s: "",
                    managerId: "date_s_g",
                    subRows: [],
                  },
                  -1,
                  row.depth + 1
                )
              );
            }}
          >
            {/* <PersonAddAltIcon /> */}
          </IconButton>
        </Tooltip> 
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        // startIcon={<PersonAddAltIcon />}
        variant="contained"
        onClick={() => {
          setCreatingRowIndex(table.getRowModel().rows.length); //create new row at bottom of table
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
    initialState: {
      // grouping: ["date_s_g"],
      // columnPinning: { left: ["mrt-row-actions"], right: [] },
      expanded: true,
      pagination: { pageSize: 20, pageIndex: 0 },

    },
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <Breadcrumb parent="Inventory management" title="Product Discount" />

      {/* <Button
        className="mt-3 btn btn-pill btn-info btn-air-info btn-air-info"
        onClick={() => setShowFromForAdd(!showFromForAdd)}
      >
        Add Product Discount
      </Button> */}

      <Card className="mt-2">
        <Collapse isOpen={showFromForAdd}>
          <AddProductDiscount
            setShowFromForAdd={setShowFromForAdd}
            allProductDiscountReFetch={allProductDiscountReFetch}
          ></AddProductDiscount>
        </Collapse>
      </Card>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h5>Product Discount List</h5>
        </div>

        <div>
          <FilesComponent />
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" style={{ padding: "20px" }}>
              {/* <DataTable
                baseForDelete={"primary_id"}
                getAllData={allProductDiscount}
                handleDelete={handleDelete}
                toggleUpdateModal={updateToggle}
                setValueForEdit={setValueForEdit}
              ></DataTable> */}
              <MaterialReactTable table={table} />
            </div>
          </div>
        </div>
      </div>
      {/* <EditProductDiscount
        modal={editModal}
        toggle={updateToggle}
        reFetch={isDarty}
        valueForEdit={valueForEdit?.original}
        setValueForEdit={setValueForEdit}
        allProductDiscountReFetch={allProductDiscountReFetch}
      ></EditProductDiscount> */}
    </>
  );
};

export default ProductDiscount;
