import { useDispatch, useSelector } from "react-redux";
import { getAuthData } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { deleteUserById } from "../../features/users/usersApiSlice";
import Swal from "sweetalert2";
import Modal from "../Modal";
import UserForm from "../forms/UserForm";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { getUsers } from "../../features/users/usersSlice";

function UserTable() {
  // dispatch
  const dispatch = useDispatch();
  // logged in user
  const { user: loginUser } = useSelector(getAuthData);
  // users data
  const { users } = useSelector(getUsers);
  // filters state
  const [filters, setFilters] = useState([...users]);

  const [updateFormOpen, setUpdateFormOpen] = useState({
    open: false,
    data: null,
  });
  // handle password update modal state
  const [passwordUpdateModal, setPasswordUpdateModal] = useState({
    open: false,
    data: null,
  });

  // handle delete user
  const handleDelete = (id, role) => {
    if (role === "superadmin") {
      return toast.error("You can't delete superadmin");
    }
    Swal.fire({
      title: "Are you sure to delete this user?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserById(id));
        Swal.fire("Suceessfully Deletd", "", "success");
      }
    });
  };

  // get action
  const actions = (rowData) => {
    return (
      <div
        className={`${
          !["admin", "superadmin"]?.includes(loginUser?.role) && "hidden"
        }  primary-highlighter font-medium text-white flex items-center gap-2 justify-center`}
      >
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

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // global filter
  const onGlobalFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    let filters = [...users];

    filters = filters.filter((filter) => {
      return (
        filter?.name?.toLowerCase()?.includes(value) ||
        filter?.email?.toLowerCase()?.includes(value)
      );
    });
    setFilters(filters);
    setGlobalFilterValue(value);
  };

  // render header
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center ml-1">
        {/* <h4 className="">Users</h4> */}
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
      </div>
    );
  };
  const header = renderHeader();

  // give index
  const giveIndex = (rowData, column) => {
    return column.rowIndex + 1;
  };

  // password change
  const passwordChange = (rowData) => {
    return (
      <div
        className={`${
          !["admin", "superadmin"]?.includes(loginUser?.role) && "hidden"
        }  primary-highlighter font-medium text-white`}
      >
        <button
          className="text-sm rounded-[4px] px-2 py-[2px] bg-violet-500 hover:bg-blue-500"
          onClick={() =>
            setPasswordUpdateModal({
              open: !updateFormOpen.open,
              data: rowData,
            })
          }
        >
          Update
        </button>
      </div>
    );
  };

  useEffect(() => {
    setFilters(users);
  }, [users]);

  return (
    <>
      <div>
        <div className="card ">
          <DataTable
            value={filters || users}
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
            emptyMessage="No users found."
          >
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
            <Column field="email" sortable header="Email" />
            <Column field="role" sortable header="Role" />

            {/* actions  */}
            {["admin", "superadmin"].includes(loginUser?.role) && (
              <Column body={actions} sortable header="Action"></Column>
            )}

            {/* password change  */}
            {["admin", "superadmin"].includes(loginUser?.role) && (
              <Column body={passwordChange} sortable header="Password Change" />
            )}
          </DataTable>
        </div>
      </div>

      {/* modal for update user password  */}
      {passwordUpdateModal?.open && (
        <Modal
          toggleModal={() =>
            setPasswordUpdateModal({
              open: false,
              data: null,
            })
          }
          title="Update User Password"
        >
          <UserForm
            data={passwordUpdateModal.data}
            title="Update User Password"
            type="p-update"
            toggleModal={() =>
              setPasswordUpdateModal({
                open: false,
                data: null,
              })
            }
          />
        </Modal>
      )}
      {/* modal for update user  */}
      {updateFormOpen.open && (
        <Modal
          toggleModal={() =>
            setUpdateFormOpen({
              open: false,
              data: null,
            })
          }
          title="Update User Data"
          type="update"
        >
          <UserForm
            data={updateFormOpen.data}
            type="update"
            toggleModal={() =>
              setUpdateFormOpen({
                open: false,
                data: null,
              })
            }
          />
        </Modal>
      )}
    </>
  );
}

export default UserTable;
