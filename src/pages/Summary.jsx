import { useSelector } from "react-redux";
import { getHistory } from "../features/history/historySlice";
import { useEffect, useState } from "react";
import SummaryTable from "../components/tables/SummaryTable";
import { Helmet } from "react-helmet-async";
export default function Summary() {
  const { history: historyData } = useSelector(getHistory);
  const todayDate = new Date().toISOString().slice(0, 10);

  // donars state
  const [history, setHistory] = useState([]);

  const [rangeHistory, setRangHistory] = useState([]);

  // from and to date state
  const [rangeDate, setRangeDate] = useState({
    from: "2020-01-01",
    to: todayDate,
  });

  // filter history by date
  useEffect(() => {
    const filterHistory = historyData?.filter((data) => {
      const date = new Date(data?.lastDonationDate);
      const fromDate = new Date(rangeDate?.from);
      const toDate = new Date(rangeDate?.to);
      return date >= fromDate && date <= toDate;
    });
    setRangHistory(filterHistory);
    setHistory(filterHistory);
  }, [rangeDate.from, rangeDate.to, historyData]);

  return (
    <>
      <Helmet>
        <meta property="og:title" content="Summary-KIN" />
        <meta
          property="og:description"
          content="KIN Blood application summary page"
        />
        <title>Summary | KIN</title>
      </Helmet>
      <div className="xl:w-[1230px] py-10 mx-auto xl:px-0 sm:px-10 px-3  overflow-hidden">
        <div className="mb-4 ">
          <p className="text-xl font-bold pb-6">
            Total Blood Donate :{" "}
            {rangeHistory?.length ? rangeHistory?.length : 0}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm  sm:text-base">
            <p className="flex items-center">
              <span className="text-[#3ea63e]">From </span>
              <input
                type="date"
                className="py-1 bg-slate-800 rounded-sm min-w-[180px] px-2  bg-transparent border border-general mx-1 focus:outline-none hover:bg-[#12131b]"
                onChange={(e) =>
                  setRangeDate({ ...rangeDate, from: e.target.value })
                }
                defaultValue={rangeDate?.from}
              />
            </p>
            <p className="flex items-center">
              <span className="text-[#3ea63e]">To </span>
              <input
                type="date"
                className="py-1 bg-slate-800 rounded-sm min-w-[180px] px-2  bg-transparent border border-general mx-1 focus:outline-none hover:bg-[#12131b] text-white"
                onChange={(e) =>
                  setRangeDate({ ...rangeDate, to: e.target.value })
                }
                defaultValue={rangeDate?.to}
              />
            </p>
          </div>
        </div>
        <div className="border  border-general px-3 sm:px-6 pt-2 pb-6 rounded-md">
          <div className="overflow-x-scroll pb-4">
            <SummaryTable history={history} />
          </div>
        </div>
      </div>
    </>
  );
}
