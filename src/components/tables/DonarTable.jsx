import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { getDonars } from "../../features/donars/donarsSlice";
import Modal from "../Modal";
import Form from "../forms/DonarForm";
import { isAvailable } from "../../helpers/helpers";
import {
  bulkDeleteDonar,
  deleteDonarById,
  updateDonarById,
} from "../../features/donars/donarApiSlice";
import "./Style.css";
import { getAuthData } from "../../features/auth/authSlice";
import { getPhone, giveIndex } from "../../helpers/utils";

export default function DonarTable() {
  const dispatch = useDispatch();

  const [, setLoading] = useState(false);

  //donars data
  const { donars } = useSelector(getDonars);

  // users
  const { user } = useSelector(getAuthData);

  // select item
  const [selectedProducts, setSelectedProducts] = useState(null);

  // filters state
  const [filters, setFilters] = useState([...donars]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // bulk delete
  const bulkDelete = () => {
    const ids = selectedProducts?.map((product) => product.id);

    Swal.fire({
      title: "Are you sure to delete these donars?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          bulkDeleteDonar({
            ids,
          })
        );
        Swal.fire("Suceessfully deleted", "", "success");
        const updatedData = donars.filter(
          (donar) => !selectedProducts?.includes(donar)
        );
        setSelectedProducts(null);
        setFilters(updatedData);
      }
    });
  };

  // global filter
  const onGlobalFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    let filters = [...donars];

    filters = filters.filter((filter) => {
      return (
        filter?.name?.toLowerCase()?.includes(value) ||
        filter?.phone?.toLowerCase()?.includes(value) ||
        filter?.bloodGroup?.toLowerCase()?.includes(value) ||
        filter?.homeDistrict?.toLowerCase()?.includes(value) ||
        filter?.department?.toLowerCase()?.includes(value) ||
        filter?.session?.toLowerCase()?.includes(value) ||
        filter?.email?.toLowerCase()?.includes(value) ||
        filter?.age?.toLowerCase()?.includes(value) ||
        filter?.comment?.toLowerCase()?.includes(value) ||
        filter?.totalDonation?.toLowerCase()?.includes(value) ||
        filter?.lastDonationDate?.toLowerCase()?.includes(value)
      );
    });
    setFilters(filters);
    setGlobalFilterValue(value);
  };

  // render header
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center ">
        {/* <h4 className="">Donars</h4> */}
        <span className="relative">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="h-5 w-5 absolute left-2.5 top-0 bottom-0 my-auto  text-[#786d6d]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z"
            ></path>
            <path
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M338.29 338.29 448 448"
            ></path>
          </svg>
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="bg-[#21293b] py-2 pl-9 focus:outline-none focus:ring-[2.5px] focus:ring-slate-700 focus:border-0 text-white w-full rounded-md h-10 placeholder:text-slate-600"
          />
        </span>
        {selectedProducts?.length > 0 && (
          <button
            className="text-sm bg-red-400 py-1 px-2 rounded-sm"
            onClick={bulkDelete}
          >
            Delete
          </button>
        )}
      </div>
    );
  };
  const header = renderHeader();

  // available donar
  const availableData = (rowData) => {
    return isAvailable(rowData?.lastDonationDate) ? (
      <span className="w-4 h-4  rounded-full bg-green-500 inline-block">
        <span className="hidden">Available</span>
      </span>
    ) : (
      <span className="w-4 h-4  rounded-full bg-red-500 inline-block">
        <span className="hidden">Not</span>
      </span>
    );
  };

  useEffect(() => {
    setFilters(donars);
  }, [donars]);

  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this donar?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDonarById(id));
        Swal.fire("Suceessfully deleted", "", "success");
        const updatedData = donars.filter((donar) => donar.id !== id);
        setFilters(updatedData);
      }
    });
  };

  // modal form
  const [formOpen, setFormOpen] = useState({
    open: false,
    data: null,
  });

  // get action
  const actions = (rowData) => {
    return (
      <span className="primary-highlighter font-medium text-white flex items-center gap-2">
        <button
          className="text-[12px] rounded-[4px] px-2 py-[2px] bg-violet-500 hover:bg-blue-500"
          onClick={() =>
            setFormOpen({
              open: true,
              data: rowData,
            })
          }
        >
          Edit
        </button>
        {["admin", "superadmin"]?.includes(user?.role) && (
          <button
            className="text-[12px] rounded-[4px] px-2 py-[2px] bg-red-500 hover:bg-red-700"
            onClick={() => {
              handleDelete(rowData?.id);
            }}
          >
            Delete
          </button>
        )}
      </span>
    );
  };

  //  update last donation date
  const updateLastDonationDate = (id, data) => {
    // today date
    const today = new Date().toISOString().split("T")[0];

    Swal.fire({
      title: "Do you want to update last donation date?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateDonarById({
            id,
            data: {
              lastDonationDate: today,
              totalDonation: data?.totalDonation
                ? Number(data?.totalDonation) + 1
                : 1,
            },
            setLoading,
          })
        );
        Swal.fire("Suceessfully Updated", "", "success");
        const updatedData = donars.filter((donar) => donar.id !== id);
        setFilters(updatedData);
      }
    });
  };

  // donated
  const donated = (rowData) => {
    return (
      <span className="primary-highlighter font-medium text-white flex items-center gap-2">
        <button
          className="text-[12px] rounded-[4px] px-2 py-[2px] bg-violet-500 hover:bg-blue-500 disabled:bg-slate-600"
          onClick={() => updateLastDonationDate(rowData?.id, rowData)}
          disabled={isAvailable(rowData?.lastDonationDate) ? false : true}
        >
          Now
        </button>
      </span>
    );
  };

  return (
    <>
      <div>
        <div className="card ">
          <DataTable
            value={filters || donars}
            paginator
            rows={20}
            scrollable
            scrollHeight="400px"
            header={header}
            dataKey="id"
            filters={filters}
            showGridlines
            rowsPerPageOptions={[20, 30, 50, 100]}
            tableStyle={{ minWidth: "50rem" }}
            globalFilterFields={["name", "phone"]}
            emptyMessage="No Donars found."
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            onRowClick={(e) => {
              setSelectedProducts(e.data);
            }}
          >
            {["admin", "superadmin"].includes(user?.role) && (
              <Column selectionMode="multiple"></Column>
            )}
            <Column body={giveIndex} header="Index">
              1
            </Column>
            <Column
              field="name"
              sortable
              style={{
                color: "#38bdf8",
              }}
              header="Name"
            ></Column>
            <Column field="bloodGroup" sortable header="Blood Group" />
            <Column
              body={getPhone}
              sortable
              field="phone"
              sortField="phone"
              header="Phone"
            />
            <Column body={availableData} sortable header="Available" />
            <Column field={donated} sortable header="Donated" />
            <Column body={actions} sortable header="Action" />
            <Column field="comment" sortable header="Comment" />
            <Column field="lastDonationDate" sortable header="Last Donation" />
            <Column field="totalDonation" sortable header="Total Donation" />
            <Column field="homeDistrict" sortable header="Address" />
            <Column field="department" sortable header="Department" />
            <Column field="session" sortable header="Session" />
            <Column field="email" sortable header="Email" />
            <Column field="age" sortable header="Age" />
            <Column
              field="lastEditedBy"
              sortable
              header="Edited By"
              style={{
                fontSize: "12px",
              }}
            />
          </DataTable>
        </div>
      </div>

      {/* form modal  */}
      {formOpen.open && (
        <Modal
          toggleModal={() =>
            setFormOpen({
              open: false,
              data: null,
            })
          }
          title="Update Donar Data"
        >
          <Form
            data={formOpen.data}
            toggleModal={() => {
              setFormOpen({
                open: false,
                data: null,
              });
              setFilters(donars);
            }}
          />
        </Modal>
      )}
    </>
  );
}
