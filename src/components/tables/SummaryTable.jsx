import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isAvailable } from "../../helpers/helpers";
import { getPhone, giveIndex } from "../../helpers/utils";

function SummaryTable({ history }) {
  // filters state
  const [filters, setFilters] = useState([...history]);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // global filter
  const onGlobalFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    let filters = [...history];

    filters = filters.filter((filter) => {
      return (
        filter?.name?.toLowerCase()?.includes(value) ||
        filter?.phone?.toLowerCase()?.includes(value) ||
        filter?.bloodGroup?.toLowerCase()?.includes(value)
      );
    });
    setFilters(filters);
    setGlobalFilterValue(value);
  };

  // render header
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center ml-1">
        {/* <h4 className="">History</h4> */}
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
    setFilters(history);
  }, [history]);

  return (
    <>
      <div>
        <div className="card ">
          <DataTable
            value={filters || history}
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
            emptyMessage="Can't find any record."
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
            />
            <Column field="bloodGroup" sortable header="Blood Group" />

            <Column
              body={getPhone}
              sortable
              field="phone"
              sortField="phone"
              header="Phone"
            ></Column>
            <Column
              field="editedBy"
              sortable
              header="Added By"
              style={{
                fontSize: "12px",
              }}
            />
            <Column body={availableData} sortable header="Available" />
            <Column
              field="lastDonationDate"
              sortable
              header="Last Donate Date"
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}

SummaryTable.propTypes = {
  history: PropTypes.array,
};

export default SummaryTable;
