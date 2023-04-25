import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import axios from "axios";
import MaterialReactTable from "material-react-table";
/*changePercent24Hr: "-0.8612388382718676"
explorer: "https://blockchain.info/"
id: "bitcoin"
marketCapUsd: "532525770736.4620549161807036"
maxSupply: "21000000.0000000000000000"
name: "Bitcoin"
priceUsd: "27513.5140738098413178"
rank: "1"
supply: "19355062.0000000000000000"
symbol: "BTC"
volumeUsd24Hr: "4299522202.3895715019255691"
vwap24Hr: "27456.5491118554101117" */
function App() {
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((response) => setCurrency(response.data.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(currency);
  const columns = useMemo(
    () => [
      {
        accessorKey: "rank", //access nested data with dot notation
        header: "Rank",
      },
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Cryptocurrency",
      },
      {
        accessorKey: "symbol", //access nested data with dot notation
        header: "Symbol",
      },
      {
        accessorKey: "priceUsd", //access nested data with dot notation
        header: "Price USD",
      },
    ],
    []
  );

  return (
    <div>
      <div className="caption">
        <caption>Cryptocurrency Table</caption>
      </div>
      <MaterialReactTable
        columns={columns}
        data={currency}
        enableTableHead
        renderDetailPanel={({ row }) => (
          <div
            color={row.original.explorer ? "secondary.main" : "text.secondary"}
          >
            {(
              <a href={row.original.explorer} target="_blank">
                {row.original.id} explorer
              </a>
            ) || "No Chart available"}
          </div>
        )}
      ></MaterialReactTable>
    </div>
  );
}

export default App;
