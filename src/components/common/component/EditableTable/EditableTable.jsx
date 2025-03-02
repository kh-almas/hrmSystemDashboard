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

const EditableTable = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        muiEditTextFieldProps: {
          type: "date",
          required: true,
          error: !!validationErrors?.date,
          helperText: validationErrors?.date,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              date: undefined,
            }),
        },
      },

      {
        accessorKey: "branch_name",
        header: "Branch",
        editVariant: "select",
        editSelectOptions: branches,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.branch_name,
          helperText: validationErrors?.branch_name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              branch_name: undefined,
            }),
        },
      },

      {
        accessorKey: "product_name",
        header: "Product",
        editVariant: "select",
        enableEditing: !isEditing,
        editSelectOptions: allProducts,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.product_name,
          helperText: validationErrors?.product_name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              product_name: undefined,
            }),
        },
      },

      {
        accessorKey: "purchase_price",
        header: "Purchase Price",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.purchase_price,
          helperText: validationErrors?.purchase_price,
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
          error: !!validationErrors?.discount_type,
          helperText: validationErrors?.discount_type,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              discount_type: undefined,
            }),
          onChange: (e) => setDiscountType(e.target.value),
        },
      },

      {
        accessorKey: "selling_price",
        header: "Selling Price",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.selling_price,
          helperText: validationErrors?.selling_price,
          onChange: (e) => setSellingPrice(e.target.value),
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              selling_price_s: undefined,
            }),
        },
      },
      {
        accessorKey: "discount_percent",
        header: "Discount Percent",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.discount_percent,
          helperText: validationErrors?.discount_percent,
          onChange: (e) => setDiscountPercent(e.target.value),
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              discount_percent_s: undefined,
            }),
          disabled: discountType === "Fixed",
        },
      },

      {
        accessorKey: "discount_value",
        header: "Discount Value",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.discount_value,
          helperText: validationErrors?.discount_value,
          value: discountValue,
          onChange: (e) => setDiscountValue(e.target.value),
          disabled: discountType === "Percent",
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              discount_value_s: undefined,
            }),
        },
      },
    ],
    [
      allProducts,
      branches,
      discountType,
      discountValue,
      isEditing,
      validationErrors,
    ]
  );
  const {
    data: fetchedDiscountData = [],
    isError: isLoadingDiscountError,
    isFetching: isFetchingDiscount,
    isLoading: isLoadingDiscount,
  } = useGetDiscountData();

  const { mutateAsync: createDiscount, isPending: isCreatingDiscount } =
    useCreateDiscount({
      batchNo,
      discountValue,
      setDiscountValue,
      setDiscountPercent,
    });
  const { mutateAsync: updateUser, isPending: isUpdatingDiscount } =
    useUpdateDiscount({ discountValue, setDiscountValue, setDiscountPercent });
  const { mutateAsync: deleteUser, isPending: isDeletingDiscount } =
    useDeleteDiscount();

  //CREATE action
  const handleCreateDiscount = async ({ values, table }) => {
    console.log("values--create", values);
    const branchName = values.branch_name;
    const productName = values.product_name;
    values.branch_name = branchName.toString();
    values.product_name = productName.toString();
    const newValidationErrors = validateDiscount(values);
    console.log("newValidationErrors", newValidationErrors);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createDiscount(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveDiscount = async ({ values, table, row }) => {
    const editData = {
      values: values,
      primaryId: row?.original?.primary_id,
      skuId: row?.original?.sku_id,
      batchNo: row?.original?.batch_no,
      branchId: row?.original?.branch_id,
    };
    setValidationErrors({});
    await updateUser(editData);
    table.setEditingRow(null); // Exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
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
          <IconButton
            onClick={() => {
              table.setEditingRow(row);
              setIsEditing(true);
            }}
          >
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
          setIsEditing(false);
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

function useCreateDiscount({
  batchNo,
  discountValue,
  setDiscountValue,
  setDiscountPercent,
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (discountData) => {
      discountData.branch_id = Number(discountData?.branch_name);
      discountData.sku_id = Number(discountData?.product_name);
      discountData.batch_no = batchNo;
      discountData.discount_value = discountValue;
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
          setDiscountValue(0);
          setDiscountPercent(0);
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

//GET hook (get Discount in api)
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

//UPDATE hook (put Discount in api)
function useUpdateDiscount({
  discountValue,
  setDiscountValue,
  setDiscountPercent,
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ values, primaryId, skuId, batchNo, branchId }) => {
      if (typeof values?.branch_name === "string") {
        values.branch_id = branchId;
      } else {
        values.branch_id = values?.branch_name;
      }
      values.sku_id = skuId;
      values.batch_no = batchNo;
      values.approve_status = "Approved";
      if (!values?.discount_percent) {
        values.discount_percent = 0;
      }
      values.discount_value = discountValue;
      try {
        const response = await axios.put(
          `inventory-management/product/discount/update/${primaryId}`,
          values
        );
        if (response?.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setDiscountValue(0);
          setDiscountPercent(0);
          queryClient.invalidateQueries("editData");
        }
      } catch (error) {
        // Handle errors here (e.g., logging, error states, etc.)
        console.error("Error create:", error);
        throw new Error("Failed to fetch discountData");
      }
    },
  });
}

//DELETE hook (delete Discount in api)
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
  <QueryClientProvider client={queryClient}>
    <EditableTable />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value?.length;
function validateDiscount(discount) {
  return {
    date: !validateRequired(discount?.date) ? "Date Name is Required" : "",
    branch_name: !validateRequired(discount?.branch_name)
      ? "branch Name is Required"
      : "",
    product_name: !validateRequired(discount?.product_name)
      ? "product Name is Required"
      : "",

    purchase_price: !validateRequired(discount?.purchase_price)
      ? "purchase_price is Required"
      : "",

    discount_type: !validateRequired(discount?.discount_type)
      ? "discount_type is Required"
      : "",

    selling_price: !validateRequired(discount?.selling_price)
      ? "selling_price is Required"
      : "",
  };
}
