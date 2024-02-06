// MaterialReactEditableTableExample.jsx
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
import React, { useMemo, useState } from "react";
// import { fakeData, usStates } from './makeData';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import axios from "../../../../axios";

const MaterialReactEditableTableExample = () => {
  const [creatingRowIndex, setCreatingRowIndex] = useState();
  const [validationErrors, setValidationErrors] = useState({});

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
        console.info("update user", user);
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
        accessorKey: "date_s_g",
        header: "Date",
        enableEditing: false,
        size: 80,
      },

      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "branch_id",
        header: "Branch",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.branch_id,
          helperText: validationErrors?.branch_id,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              branch_id: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "product_s",
        header: "Product",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.product_s,
          helperText: validationErrors?.product_s,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              product_s: undefined,
            }),
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
    [validationErrors]
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
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
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
      //conditional styling based on row depth
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
                    id: null,
                    branch_id: "",
                    product_s: "",
                    purchase_price_s: "",
                    selling_price_s: "",
                    discount_type_s: "",
                    discount_value_s: "",
                    managerId: row.id,
                    subRows: [],
                  },
                  -1,
                  row.depth + 1
                )
              );
            }}
          >
            <PersonAddAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        startIcon={<PersonAddAltIcon />}
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
      columnPinning: { left: ["mrt-row-actions"], right: [] },
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

  return <MaterialReactTable table={table} />;
};

export default MaterialReactEditableTableExample;
