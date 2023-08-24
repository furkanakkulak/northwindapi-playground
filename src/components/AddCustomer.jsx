import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const addNewCustomer = async (newCustomerData) => {
  const response = await axios.post(
    'https://northwind.vercel.app/api/customers',
    newCustomerData
  );
  return response.data;
};

const AddCustomer = () => {
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    companyName: '',
    address: {
      street: '',
      city: '',
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(addNewCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries('customers');
      setShowModal(false);
      setSuccessMessage('Customer added successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    },
    onError: (error) => {
      setErrorMessage('An error occurred: ' + error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    },
  });

  const handleFormSubmit = () => {
    mutation.mutate(newCustomer);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="add"
      >
        Add Customer
      </button>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {showModal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="container">
            <div className="header">
              <h2 className="text-xl font-semibold">Add Customer</h2>
              <button
                onClick={() => setShowModal(false)}
                className="close"
              >
                &times;
              </button>
            </div>
            <div className="body">
              <form>
                <div className="mb-4">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    onChange={(e) => {
                      setNewCustomer({
                        ...newCustomer,
                        companyName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    placeholder="Street"
                    onChange={(e) => {
                      setNewCustomer({
                        ...newCustomer,
                        address: {
                          ...newCustomer.address,
                          street: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    onChange={(e) => {
                      setNewCustomer({
                        ...newCustomer,
                        address: {
                          ...newCustomer.address,
                          city: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}

                <div className="text-center">
                  <button
                    type="button"
                    className="submit"
                    onClick={handleFormSubmit}
                  >
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCustomer;
