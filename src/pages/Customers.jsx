import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import AddCustomer from '../components/AddCustomer';
import {
  ArrowDownward,
  ArrowUpward,
  Refresh,
  SwapVert,
} from '@mui/icons-material';

const fetchCustomers = async () => {
  const response = await axios.get(
    'https://northwind.vercel.app/api/customers'
  );
  return response.data;
};

const sortData = (data, sortBy, sortDirection) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy.startsWith('address.')) {
      const addressKey = sortBy.split('.')[1];
      aValue = a.address ? a.address[addressKey] : '';
      bValue = b.address ? b.address[addressKey] : '';
    }

    if (aValue !== undefined && bValue !== undefined) {
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }

    if (aValue === undefined) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortedData;
};

const Customers = () => {
  const [rowCount, setRowCount] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('companyName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error } = useQuery('customers', fetchCustomers);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSortColumn(null);
  };

  const filteredData = data?.filter((info) => {
    const companyName = info?.companyName?.toLowerCase() || '';
    const street = info?.address?.street?.toLowerCase() || '';
    const city = info?.address?.city?.toLowerCase() || '';

    return (
      companyName.includes(searchTerm.toLowerCase()) ||
      street.includes(searchTerm.toLowerCase()) ||
      city.includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [rowCount]);

  const handleRowCountChange = (e) => {
    setRowCount(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prevSortDirection) =>
        prevSortDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortColumn(column);
      setSortBy(column);
      setSortDirection('asc');
      setCurrentPage(1);
      setSearchTerm('');
    }
  };

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const itemsPerPage =
    rowCount === 'All' ? data.length : parseInt(rowCount, 10);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const sortedData = sortColumn ? sortData(data, sortBy, sortDirection) : data;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleRemoveSort = () => {
    setSortColumn(null);
    setSortBy('companyName');
    setSortDirection('asc');
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="flex  md:flex-row flex-col-reverse justify-between items-center mt-5 mb-2 md:mb-0 md:mt-0">
        <div className="flex gap-5 items-center flex-col-reverse md:flex-row w-full md:w-auto">
          <input
            className="p-1 border rounded-md shadow-sm border-dark-text dark:border-light-text w-full md:w-auto bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            placeholder="Search.."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="flex flex-row">
            <label className="text-light-text dark:text-dark-text">
              Row Count:{' '}
            </label>
            <select
              className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
              value={rowCount}
              onChange={handleRowCountChange}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
              <option>All</option>
            </select>
          </div>
        </div>
        <AddCustomer />
      </div>
      <div className="border rounded-2xl border-dark-text dark:border-light-text px-2.5 py-10 md:px-5 md:py-10 relative">
        <div className="overflow-x-auto w-full">
          <div className="min-w-full inline-block">
            <div className="overflow-hidden">
              {sortColumn && (
                <button
                  className="px-3 py-1 rounded-md mx-1 focus:outline-none bg-light-primary dark:bg-dark-primary text-dark-text dark:text-light-text top-2.5 right-2.5 absolute hover:bg-light-secondary dark:hover:bg-dark-secondary "
                  onClick={handleRemoveSort}
                >
                  <Refresh />
                </button>
              )}
              <table>
                <thead>
                  <tr>
                    <th
                      className="cursor-pointer select-none"
                      onClick={() => {
                        searchTerm ? null : handleSort('companyName');
                      }}
                    >
                      <div className="w-max sm:w-auto">
                        Company Name{' '}
                        {sortColumn === 'companyName' ? (
                          sortDirection === 'asc' ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )
                        ) : (
                          <SwapVert />
                        )}
                      </div>
                    </th>
                    <th
                      className="cursor-pointer select-none"
                      onClick={() => {
                        searchTerm ? null : handleSort('address.street');
                      }}
                    >
                      <div>
                        Street{' '}
                        {sortColumn === 'address.street' ? (
                          sortDirection === 'asc' ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )
                        ) : (
                          <SwapVert />
                        )}
                      </div>
                    </th>
                    <th
                      className="cursor-pointer select-none"
                      onClick={() => {
                        searchTerm ? null : handleSort('address.city');
                      }}
                    >
                      <div>
                        City{' '}
                        {sortColumn === 'address.city' ? (
                          sortDirection === 'asc' ? (
                            <ArrowDownward />
                          ) : (
                            <ArrowUpward />
                          )
                        ) : (
                          <SwapVert />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchTerm &&
                    filteredData.map((info, index) => (
                      <tr key={index}>
                        <td>{info?.companyName}</td>
                        <td>{info?.address?.street}</td>
                        <td>{info?.address?.city}</td>
                      </tr>
                    ))}
                  {!searchTerm &&
                    paginatedData.map((info, index) => (
                      <tr key={index}>
                        <td>{info?.companyName}</td>
                        <td>{info?.address?.street}</td>
                        <td>{info?.address?.city}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-y-5 md:flex-row items-center justify-between">
          {!searchTerm && (
            <p
              className={`text-sm text-light-text dark:text-dark-text ${
                rowCount === 'All' ? 'mx-auto' : ''
              }`}
            >
              {`Showing 
              ${Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                data.length
              )} - ${Math.min(currentPage * itemsPerPage, data.length)} of
              ${data.length}
              results.`}
            </p>
          )}
          {!searchTerm && rowCount !== 'All' && (
            <div className="flex items-center justify-between w-full md:w-auto md:justify-end">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md mx-1 focus:outline-none bg-light-primary dark:bg-dark-primary disabled:bg-opacity-80 disabled:dark:bg-opacity-80 text-light-text dark:text-dark-text"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md mx-1 focus:outline-none bg-light-primary dark:bg-dark-primary disabled:bg-opacity-80 disabled:dark:bg-opacity-80 text-light-text dark:text-dark-text"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Customers;
