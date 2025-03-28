import "./App.css";
import { useState } from "react";
import {Alert, Filters} from "./types.ts";
import { formatTimestamp } from "./utils.ts";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
import {getAlerts, sortAlerts} from "./api.ts";
import FilterButton from "./components/FilterButton.tsx";
import SortButton from "./components/SortButton.tsx";
import FilterDialog from "./components/FilterDialog.tsx";
import SortDialog from "./components/SortDialog.tsx";
import Loading from "./components/Loading.tsx";
import Error from "./components/Error.tsx";
import { states } from "./data.ts";


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

function MainPage() {
  const [filters, setFilters] = useState<Filters>({
    state: "",
    regions: [],
  });
  const [sortValues, setSortValues] = useState({
    sortBy: "Most Recent",
    isDescending: true,
  });
  const stateCode = states[filters.state] || undefined;
  const { isPending, error, data } = useQuery({
    queryKey: ["alerts", filters.state, filters.regions],
    queryFn: () => getAlerts(stateCode, filters.regions),
  });
  const sortedData = sortAlerts(data, sortValues.sortBy, sortValues.isDescending)
  if (isPending) return <Loading/>;
  if (error) return <Error error={error}/>;

  return (
    <div className={"m-2"}>
      {sortedData ? <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">{sortedData.title}</h1> : null}
      <div className="flex gap-3 ml-3">
        <FilterButton />
        <SortButton />
      </div>
      <FilterDialog setFilters={setFilters} states={states} />
      <SortDialog setSortValues={setSortValues} />
      {sortedData ? (
        <>
          <div className=" overflow-x-auto">
            <table className=" max-w-full table table-pin-rows border-spacing-y-3">
              {/* head */}
              <thead>
                <tr>
                  <td>Alert</td>
                  <td>Severity</td>
                  <td>Affected Regions</td>
                  <td>Starts</td>
                  <td>Ends</td>
                </tr>
              </thead>
              <tbody>
                {sortedData?.features?.map((alert: Alert) => (
                  <tr className={`m-6 hover:bg-base-300 border-2`} key={alert.id}>
                    <td className={""}>
                      <div className="flex items-center gap-3 ">
                        <div>
                          <div className="font-bold">
                            {alert.properties.event}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{alert.properties.severity}</td>
                    <td className={"sm:max-w-[600px] max-w[100px]"}>{alert.properties.areaDesc}</td>
                    <td>{formatTimestamp(alert.properties.effective)}</td>
                    <td>{formatTimestamp(alert.properties.ends)}</td>

                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Alert</td>
                  <td>Location</td>
                  <td>Time</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
