/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import "./filtering.css";
import { useSelector } from "react-redux";



export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <div className="d-flex">
      <input
        className="form-control input-search "
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export const GlobalFilter = ({ filter, setFilter }) => {
  const token = useSelector((state) => state.auth.auth.idToken);


  return (
    <>
      <div className="row">
        <div className="col-md-6 col-lg-3 p-1">
          {/* <Select options={options1} placeholder="lender-name" /> */}
          <input
            className="input-search form-control w-100 my-0"
            value={filter || ""}
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export const FillterData = () => {
    const finddata=useLocation()
    console.log(finddata.state.data,'finddata')
  const COLUMNS = [
    {
      Header: "Id",
      Footer: "Id",
      accessor: "id",
    },
    {
        Header: "name",
        Footer: "Name",
        accessor: "name",
        Cell: ({ value}) => {
          console.log(value,'response1==');
          // const DelCompanies = () => { };
          return (
            <>
              <Link to={'/Lender_Profile/:id'}>
                <p>{value}</p>
              </Link>
  
            </>
          );
        },
      },
    {
      Header: "non_qm",
      Footer: "Info",
      accessor: "non_qm",
    },
    {
      Header: "phone",
      Footer: "Info",
      accessor: "phone",
    },
    {
      Header: "product_offered",
      Footer: "Info",
      accessor: "product_offered",
    },
    {
      Header: "tbd_underwriting",
      Footer: "Info",
      accessor: "tbd_underwriting",
    },
    {
      Header: "types_of_rate",
      Footer: "Info",
      accessor: "types_of_rate",
    },
    {
      Header: "updated_at",
      Footer: "Info",
      accessor: "updated_at",
    },
    {
      Header: "url",
      Footer: "Info",
      accessor: "url",
    },
    {
      Header: "zipcode",
      Footer: "Info",
      accessor: "zipcode",
    },
    {
      Header: "approved_states",
      Footer: "Info",
      accessor: "approved_states",
    },
    {
      Header: "city",
      Footer: "Info",
      accessor: "city",
    },
    {
      Header: "conventional_program",
      Footer: "Info",
      accessor: "conventional_program",
    },
    {
      Header: "cpl",
      Footer: "Info",
      accessor: "cpl",
    },
    {
      Header: "created_at",
      Footer: "Info",
      accessor: "created_at",
    },
    {
      Header: "early_pay_penalty",
      Footer: "Info",
      accessor: "early_pay_penalty",
    },
    {
      Header: "fha",
      Footer: "Info",
      accessor: "fha",
    },
    {
      Header: "file",
      Footer: "Info",
      accessor: "file",
    },
    {
      Header: "filename",
      Footer: "Info",
      accessor: "filename",
    },
    {
      Header: "image_path",
      Footer: "Info",
      accessor: "image_path",
    },
    {
      Header: "loss_payee",
      Footer: "Info",
      accessor: "loss_payee",
    },
    {
      Header: "manual_underwriting",
      Footer: "Info",
      accessor: "manual_underwriting",
    },
  ]; //   const data = useMemo(() => MOCK_DATA, []);
  const [columns, setColums] = useState(COLUMNS);
//   const [data, setData] = useState([]);
  const tableInstance = useTable(
    {
      columns,
      data: finddata.state.data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;
  const [loader, setLoader] = useState(false);

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="card">
        <div className="card-body">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="table-responsive">
            <table {...getTableProps()} className="table  display cursor-pointer">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup?.headers.map((column) => (
                      <th {...column?.getHeaderProps()}>
                        {column.render("Header")}
                        {/* {column.canFilter ? column.render("Filter") : null} */}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="cursor-pointer hover-light text-center">
                {page?.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row?.getRowProps()}>
                      {row?.cells?.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {" "}
                            {cell?.render("Cell")}{" "}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
                {""}
              </span>
              <span className="table-index">
                Go to page :{" "}
                <input
                  type="number"
                  className="ml-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>
            </div>
            <div className="text-center">
              <div className="filter-pagination  mt-3">
                <button
                  className=" previous-button"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {"<<"}
                </button>

                <button
                  className="previous-button"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
                <button
                  className=" next-button"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FillterData;