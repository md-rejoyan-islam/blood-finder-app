// give index
export const giveIndex = (rowData, column) => {
  return column.rowIndex + 1;
};

// get phone
export const getPhone = (rowData) => {
  return (
    <a
      href={`tel:${rowData?.phone}`}
      className="text-sm lg:text-base hover:text-blue-500 hover:underline"
    >
      {rowData?.phone || <span className="text-[11px] text-red-400">N/A</span>}
    </a>
  );
};
