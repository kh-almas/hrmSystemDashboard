import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../axios";
import GetAllBranch from "../../Query/hrm/GetAllBranch";
import GetAllSKUForSelect from "../../Query/inventory/GetAllSKUForSelect";

//50 us states array
// const usStates = [
//   "Alabama",
//   "Alaska",
//   "Arizona",
//   "Arkansas",
//   "California",
//   "Colorado",
//   "Connecticut",
//   "Delaware",
//   "Florida",
//   "Georgia",
//   "Hawaii",
//   "Idaho",
//   "Illinois",
//   "Indiana",
//   "Iowa",
//   "Kansas",
//   "Kentucky",
//   "Louisiana",
//   "Maine",
//   "Maryland",
//   "Massachusetts",
//   "Michigan",
//   "Minnesota",
//   "Mississippi",
//   "Missouri",
//   "Montana",
//   "Nebraska",
//   "Nevada",
//   "New Hampshire",
//   "New Jersey",
//   "New Mexico",
//   "New York",
//   "North Carolina",
//   "North Dakota",
//   "Ohio",
//   "Oklahoma",
//   "Oregon",
//   "Pennsylvania",
//   "Rhode Island",
//   "South Carolina",
//   "South Dakota",
//   "Tennessee",
//   "Texas",
//   "Utah",
//   "Vermont",
//   "Virginia",
//   "Washington",
//   "West Virginia",
//   "Wisconsin",
//   "Wyoming",
//   "Puerto Rico",
//   "Western Australia",
//   "Northern Territory",
//   "South Australia",
//   "Queensland",
// ];

const EditableTable = () => {
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState([]);
  const [batchNo, setBatchNo] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    const discountAmount = (sellingPrice * discountPercent) / 100;

    setDiscountValue(discountAmount);
  }, [discountPercent, sellingPrice]);

  console.log("discountValue---", discountValue);

  const [allBranchStatus, allBranchReFetch, allBranch, allBranchError] =
    GetAllBranch();
  const [allSkuStatus, allSkuReFetch, allSku, allSkuError] =
    GetAllSKUForSelect();

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

  function generateSkuCode(count) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  }
  useEffect(() => {
    const batchNo = generateSkuCode(12);
    setBatchNo(batchNo);
  }, []);

  let branches = [];
  branch?.forEach((item) => {
    branches.push({
      label: item?.name,
      value: item?.id,
    });
  });

  let allProducts = [];
  data?.forEach((item) => {
    allProducts.push({
      label: item?.label,
      value: item?.id,
    });
  });

  // const mapProductsOptions = (data) => {
  //   return data?.map((item) => ({
  //     label: item?.label,
  //     value: item?.id,
  //   }));
  // };

  const columns = useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        muiEditTextFieldProps: {
          // You can add any props specific to date editing here
          type: "date", // This will render a date picker
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
        accessorKey: "branch_name",
        header: "Branch",
        editVariant: "select",
        editSelectOptions: branches, // Map branch data to options
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.branch_id,
          helperText: validationErrors?.branch_id,
        },
      },

      {
        accessorKey: "product_name",
        header: "Product",
        editVariant: "select",
        editSelectOptions: allProducts,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.product_s,
          helperText: validationErrors?.product_s,
        },
      },
      {
        accessorKey: "purchase_price",
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
        accessorKey: "discount_type",
        header: "Discount Type",
        editVariant: "select",
        editSelectOptions: [
          { id: "Percent", label: "Percent" },
          { id: "Fixed", label: "Fixed" },
        ],
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.discount_type_s,
          helperText: validationErrors?.discount_type_s,
          onChange: (e) => setDiscountType(e.target.value),
        },
      },

      {
        accessorKey: "selling_price",
        header: "Selling Price",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.selling_price_s,
          helperText: validationErrors?.selling_price_s,
          onChange: (e) => setSellingPrice(e.target.value),
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              selling_price_s: undefined,
            }),
        },
      },

      // {
      //   accessorKey: "discount_type",
      //   header: "Discount Type",
      //   editVariant: "select",
      //   editSelectOptions: [
      //     { id: "Percent", label: "Percent" },
      //     { id: "Fixed", label: "Fixed" },
      //   ],
      //   muiEditTextFieldProps: {
      //     select: true,
      //     error: !!validationErrors?.discount_type_s,
      //     helperText: validationErrors?.discount_type_s,
      //   },
      // },

      // {
      //   accessorKey: "discount_percent",
      //   header: "Discount Percent",
      //   muiEditTextFieldProps: {
      //     required: true,
      //     error: !!validationErrors?.discount_percent_s,
      //     helperText: validationErrors?.discount_percent_s,
      //     //remove any previous validation errors when user focuses on the input
      //     onFocus: () =>
      //       setValidationErrors({
      //         ...validationErrors,
      //         discount_percent_s: undefined,
      //       }),
      //   },
      // },

      {
        accessorKey: "discount_percent",
        header: "Discount Percent",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.discount_percent_s,
          helperText: validationErrors?.discount_percent_s,
          onChange: (e) => setDiscountPercent(e.target.value),
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              discount_percent_s: undefined,
            }),
          disabled: discountType === "Fixed", // Disable input if discountType is "Fixed"
        },
      },

      {
        accessorKey: "discount_value",
        header: "Discount Value",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.discount_value_s,
          helperText: validationErrors?.discount_value_s,
          value: discountValue,
          onChange: (e) => setDiscountValue(e.target.value),

          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              discount_value_s: undefined,
            }),
        },
      },
    ],
    [allProducts, branches, discountType, discountValue, validationErrors]
  );
  const {
    data: fetchedDiscountData = [],
    isError: isLoadingDiscountError,
    isFetching: isFetchingDiscount,
    isLoading: isLoadingDiscount,
  } = useGetDiscountData();

  const dataD = { batchNo, discountValue };

  const { mutateAsync: createDiscount, isPending: isCreatingDiscount } =
    useCreateDiscount(dataD);
  const { mutateAsync: updateUser, isPending: isUpdatingDiscount } =
    useUpdateDiscount();
  const { mutateAsync: deleteUser, isPending: isDeletingDiscount } =
    useDeleteDiscount();

  //call UPDATE hook

  //CREATE action
  const handleCreateDiscount = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    setValidationErrors({});
    await createDiscount(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveDiscount = async ({ values, table }) => {
    // console.log("object", values);
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
    // if (window.confirm("Are you sure you want to delete this user?")) {
    //   console.log('row.original',row.original)
    //   deleteUser(row.original.primary_id);
    // }
    deleteUser(row.original.primary_id);
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedDiscountData,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingDiscountError
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

    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateDiscount,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveDiscount,
    renderRowActions: ({ row, table }) => (
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
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Discount
      </Button>
    ),
    state: {
      isLoading: isLoadingDiscount,
      isSaving: isCreatingDiscount || isUpdatingDiscount || isDeletingDiscount,
      showAlertBanner: isLoadingDiscountError,
      showProgressBars: isFetchingDiscount,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useCreateDiscount(dataD) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (discountData) => {
      discountData.branch_id = discountData?.branch_name;
      discountData.sku_id = discountData?.product_name;
      discountData.batch_no = dataD?.batchNo;
      discountData.discount_value = dataD?.discountValue;
      discountData.approve_status = "Approved";
      if (!discountData?.discount_percent) {
        discountData.discount_percent = 0;
      }
      if (!discountData?.discount_value) {
        discountData.discount_value = 0;
      }
      try {
        const response = await axios.post(
          "/inventory-management/product/discount/add",
          discountData
        );
        if (response?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          queryClient.invalidateQueries("discountData");
        }

        // // Simulate delay with setTimeout
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // // Return the user data
        // return response?.data;
      } catch (error) {
        // Handle errors here (e.g., logging, error states, etc.)
        console.error("Error create:", error);
        throw new Error("Failed to fetch discountData");
      }
    },
  });
}
function useGetDiscountData() {
  return useQuery({
    queryKey: ["discount"],
    queryFn: async () => {
      try {
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
        console.error("Error fetching discount:", error);
        throw new Error("Failed to fetch discount");
      }
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here



      
      // await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      // return Promise.resolve();
    },
    // //client side optimistic update
    // onMutate: (newUserInfo) => {
    //   queryClient.setQueryData(["users"], (prevData) =>
    //     prevData?.map((data) =>
    //       data.id === newUserInfo.id ? newUserInfo : data
    //     )
    //   );
    // },
    // // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (primary_id) => {
      //send api update request here
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
            .delete(
              `/inventory-management/product/discount/delete/${primary_id}`
            )
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
              queryClient.invalidateQueries("discountData");
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

      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <EditableTable />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value?.length;
// const validateEmail = (email) =>
//   !!email?.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );

function validateUser(user) {
  return {
    firstName: !validateRequired(user?.firstName)
      ? "First Name is Required"
      : "",
    lastName: !validateRequired(user?.lastName) ? "Last Name is Required" : "",
    // email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
