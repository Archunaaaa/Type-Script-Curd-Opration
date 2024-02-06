import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router-dom";


import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getdatarequest, deleteDataRequest } from "../Action/SagaAction";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// import { RootState } from "./yourReduxStoreFile"; // Replace with your actual Redux store file path

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  cpass: string;
  dob: string;
  language: string;
  gender: string;
}

const SagaTable: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.reducersaga);
  const navigate = useNavigate();
  const dt = useRef<DataTable<any>>(null);
  const [selectedProducts, setSelectedProducts] = useState<Employee[]>([]);
  const [rowClick] = useState<boolean>(true);
  const [state, setState] = useState<{
    deleteDialogVisible: boolean;
    deleteSelectedDialogVisible: boolean;
    deleteTarget: Employee | null;
  }>({
    deleteDialogVisible: false,
    deleteSelectedDialogVisible: false,
    deleteTarget: null,
  });
  const [globalSearchText, setGlobalSearchText] = useState<string>("");

  const getdata = async () => {
    dispatch(getdatarequest());
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.employees]);

  const handleEditClick = (id: string) => {
    navigate(`/SagaForm/${id}`);
  };

  const clearFilters = () => {
    if (dt.current) {
      dt.current.reset();
    }
    setGlobalSearchText("");
    if (dt.current) {
      dt.current.filter("", "name", "equals");
      dt.current.filter("", "email", "equals");
      dt.current.filter("", "phone", "equals");
      dt.current.filter("", "password", "equals");
      dt.current.filter("", "cpass", "equals");
      dt.current.filter("", "dob", "equals");
      dt.current.filter("", "language", "equals");
      dt.current.filter("", "gender", "equals");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_TEXT", users: e.target.value });
    setGlobalSearchText(e.target.value);
  };

  const confirmDelete = async () => {
    if (state.deleteTarget) {
      const employeeId = state.deleteTarget.id;
      await dispatch(
        deleteDataRequest({
          id: employeeId.toString(),
          name: "",
          email: "",
          phone: "",
          password: "",
          cpass: "",
          dob: "",
          language: "",
          gender: "",
        })
      );

      setSelectedProducts([]);
      setState({ ...state, deleteDialogVisible: false });
    }
  };

  const confirmDeleteSelected = () => {
    setState({ ...state, deleteSelectedDialogVisible: true });
  };

  const deleteSelectedUsers = async () => {
    const selectedEmployeeIds = selectedProducts.map((employee) => employee.id);

    if (selectedEmployeeIds && selectedEmployeeIds.length > 0) {
      await Promise.all(
        selectedEmployeeIds.map(async (employeeId) => {
          await dispatch(
            deleteDataRequest({
              id: employeeId.toString(),
              name: "",
              email: "",
              phone: "",
              password: "",
              cpass: "",
              dob: "",
              language: "",
              gender: "",
            })
          );
        })
      );

      setSelectedProducts([]);
    }

    setState({ ...state, deleteSelectedDialogVisible: false });
  };

  const filteredData = users.employees.filter((row: Employee) =>
    [
      "name",
      "email",
      "phone",
      "password",
      "cpass",
      "language",
      "dob",
      "gender",
    ].some((field) =>
      (row as any)[field]
        ?.toLowerCase()
        .includes(globalSearchText.toLowerCase())
    )
  );

  const header = (
    <div className="d-md-flex justify-content-between gap-2">
      <div>
        <h3>Employee Details</h3>
      </div>
      <div className="d-md-flex">
        <div className="my-auto">
          <Button
            onClick={clearFilters}
            className="pi pi-filter-slash p-button-outlined me-3 p-2"
          >
            <span className="ms-2">Clear</span>
          </Button>
        </div>
        <div className="me-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalSearchText}
              onChange={handleSearch}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center col-10 mx-auto  mt-5">
      <div className="d-md-flex border shadow justify-content-between p-3 my-3">
        <div className="d-flex justify-content-center">
          <div>
            <Link to="/SagaForm">
              <Button className="p-button p-button-success  me-2">
                <FaPlus className="me-2" />
                <span>New</span>
              </Button>
            </Link>
          </div>
          <div>
            <Button
              onClick={confirmDeleteSelected}
              className="p-button p-button-danger"
              disabled={!selectedProducts || selectedProducts.length === 0}
            >
              <FaTrashAlt className="me-2" />
              <span>Delete </span>
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-2 mt-md-0">
        
        </div>
      </div>
      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className="datatable">
        <DataTable
          ref={dt}
          value={filteredData}
          paginator
          header={header}
          rows={5}
          className="card shadow mb-5"
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          columnResizeMode="expand"
          resizableColumns
          showGridlines
          selectionMode={rowClick ? null : "checkbox"}
          selection={selectedProducts}
          onSelectionChange={(e: { value: Employee[] }) =>
            setSelectedProducts(e.value)
          }
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search by email"
            style={{ width: "25%" }}
          />
          <Column
            field="phone"
            header="Phone"
            sortable
            filter
            filterPlaceholder="Search by phone"
            style={{ width: "25%" }}
          />
          <Column
            field="password"
            header="Password"
            sortable
            filter
            filterPlaceholder="Search by password"
            style={{ width: "25%" }}
          />
          <Column
            field="cpass"
            header="Confirm Password"
            sortable
            filter
            filterPlaceholder="Search by cpass"
            style={{ width: "25%" }}
          />
          <Column
            field="dob"
            header="Date of Birth"
            sortable
            filter
            filterPlaceholder="Search by dob"
            style={{ width: "25%" }}
          />
          <Column
            field="language"
            header="Language"
            sortable
            filter
            filterPlaceholder="Search by language"
            style={{ width: "25%" }}
          />
          <Column
            field="gender"
            header="Gender"
            sortable
            filter
            filterPlaceholder="Search by gender"
            style={{ width: "25%" }}
          />
<Column
  body={(rowData: Employee) => (
    <>
      {/* Remove the unnecessary <div> element */}
      <Link to={`/SagaForm/${rowData.id}`}>
        <Button
          onClick={() => handleEditClick(rowData.id)}
          icon={<FaPencilAlt />}
          className="p-button p-button-primary mx-2 p-button-rounded"
        />
      </Link>
      <Button
        onClick={() =>
          setState({
            ...state,
            deleteDialogVisible: true,
            deleteTarget: rowData,
          })
        }
        icon={<FaTrashAlt />}
        className="p-button p-button-danger p-button-rounded"
        rounded
      />
    </>
  )}
/>

        </DataTable>
      </div>

      <Dialog
        visible={state.deleteDialogVisible}
        onHide={() =>
          setState({ ...state, deleteDialogVisible: false, deleteTarget: null })
        }
        header="Confirm Deletion"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() =>
                setState({
                  ...state,
                  deleteDialogVisible: false,
                  deleteTarget: null,
                })
              }
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={confirmDelete}
            />
          </div>
        }
      >
        {state.deleteTarget && (
          <p>
            Are you sure you want to delete the user{" "}
            <strong>{state.deleteTarget.name}</strong>?
          </p>
        )}
      </Dialog>

      <Dialog
        visible={state.deleteSelectedDialogVisible}
        onHide={() =>
          setState({ ...state, deleteSelectedDialogVisible: false })
        }
        header="Confirm Deletion"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() =>
                setState({ ...state, deleteSelectedDialogVisible: false })
              }
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={deleteSelectedUsers}
            />
          </div>
        }
      >
        <p>Are you sure you want to delete the selected users ?</p>
      </Dialog>
    </div>
  );
};

export default SagaTable;