import React from "react";
//import { Link } from "react-router-dom";

export default function TableCard({table}) {
    
    /*
    data-table-id-status=${table.table_id}
     */
    const tableStatus = table.reservation_id ? "Occupied" : "Free"
    
    return (
        <>
          <div className="card m-2 " style={{ width: "12rem" }}>
            <div className="card-body p-2">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">
                    {table.table_name}
                </h5>
                <h6>  
                    <span className="oi oi-people mr-1"> </span>
                            {table.capacity}
                        </h6>
              </div>
    
              <div className="d-flex justify-content-between">
                <h6 data-table-id-status={table.table_id}>
                    {tableStatus}
                </h6>
              </div>
              
            </div>
          </div>
        </>
      );
}

