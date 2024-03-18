import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch } from "react-redux";
import { deletePatientById } from "../features/patient/patientApiSlice";
import { getPatientsData } from "../features/patient/patientSlice";
import { getPhone, giveIndex } from "../helpers/utils";
import Modal from "../components/Modal";
import PatientForm from "../components/forms/PatientForm";
import Swal from "sweetalert2";

export default function Patient() {
  // modal
  const [formOpen, setFormOpen] = useState(false);
  const [updateFormOpen, setUpdateFormOpen] = useState({
    open: false,
    data: null,
  });

  // pateints data
  const { patients } = useSelector(getPatientsData);

  const dispatch = useDispatch();

  const [filters, setFilters] = useState([]);

  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete this patient?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePatientById(id));
        Swal.fire("Suceessfully deleted", "", "success");
      }
    });
  };

  // get action
  const actions = (rowData) => {
    return (
      <div className="primary-highlighter font-medium text-white flex items-center gap-2 justify-center">
        <button
          className="text-sm rounded-[4px] px-2 py-[2px] bg-violet-500 hover:bg-blue-500"
          onClick={() =>
            setUpdateFormOpen({
              open: !updateFormOpen.open,
              data: rowData,
            })
          }
        >
          Edit
        </button>
        <button
          className="text-sm rounded-[4px] px-2 py-[2px] bg-red-500 hover:bg-red-700"
          onClick={() => handleDelete(rowData.id, rowData.role)}
        >
          Delete
        </button>
      </div>
    );
  };

  // data load
  useEffect(() => {
    setFilters(patients);
  }, [patients]);

  return (
    <>
      <Helmet>
        <meta property="og:title" content="Summary-KIN" />
        <meta
          property="og:description"
          content="KIN Blood application patient page"
        />
        <title>Patient | KIN</title>
      </Helmet>
      <div className="xl:w-[1230px] py-10 mx-auto xl:px-0 sm:px-10 px-3  overflow-hidden">
        <div className="mb-4">
          <button
            type="button"
            className="flex items-center  gap-1 justify-center   text-sm h-fit w-fit bg-blue-500 rounded-md py-[6px] px-2  text-white"
            onClick={() => setFormOpen(!formOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 font-bold"
              color="white"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
            </svg>
            <span className="block font-bold text-[12px]">Add Patient</span>
          </button>
        </div>
        <div className="border  border-general px-3 sm:px-6 pt-2 pb-6 rounded-md">
          <div className="overflow-x-scroll pb-4">
            <div>
              <div className="card ">
                <DataTable
                  value={filters}
                  paginator
                  rows={20}
                  scrollable
                  scrollHeight="400px"
                  //   header={header}
                  dataKey="id"
                  filters={filters}
                  showGridlines
                  rowsPerPageOptions={[20, 30, 50, 100]}
                  tableStyle={{ minWidth: "50rem" }}
                  globalFilterFields={["name", "phone"]}
                  emptyMessage="Can't find any record."
                >
                  <Column body={giveIndex} header="Index" />
                  <Column
                    field="bloodGroup"
                    sortable
                    style={{
                      color: "#38bdf8",
                    }}
                    header="Blood Group"
                  />

                  <Column
                    body={getPhone}
                    sortable
                    field="phone"
                    sortField="phone"
                    header="Phone"
                  />
                  <Column field="location" sortable header="Location" />
                  <Column field="amount" sortable header="Amount" />
                  <Column field="date" sortable header="Date" />
                  <Column
                    field="editedBy"
                    sortable
                    header="Edited By"
                    style={{
                      fontSize: "12px",
                    }}
                  />
                  <Column
                    field="comment"
                    sortable
                    style={{
                      color: "#38bdf8",
                    }}
                    header="Commnet"
                  />
                  <Column body={actions} sortable header="Action"></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal for add new patient  */}
      {formOpen && (
        <Modal
          toggleModal={() => setFormOpen(!formOpen)}
          title="Add New Patient"
        >
          <PatientForm
            toggleModal={() => setFormOpen(!formOpen)}
            type={"add"}
          />
        </Modal>
      )}
      {/* modal for update patient  */}
      {updateFormOpen.open && (
        <Modal
          toggleModal={() =>
            setUpdateFormOpen({
              open: false,
              data: null,
            })
          }
          title="Update Patient"
        >
          <PatientForm
            data={updateFormOpen.data}
            toggleModal={() =>
              setUpdateFormOpen({
                open: false,
                data: null,
              })
            }
            type={"update"}
          />
        </Modal>
      )}
    </>
  );
}
