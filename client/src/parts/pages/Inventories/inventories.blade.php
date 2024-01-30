import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const InventoryManagement = () => {
    const [inventories, setInventories] = useState([]);
    const [form, setForm] = useState({});

    useEffect(() => {
        fetchInventories();
    }, []);

    const fetchInventories = async () => {
        const response = await axios.get('/inventories');
        setInventories(response.data);
    };

    const handleFormChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/inventories/add', form);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1800
            });
            fetchInventories();
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Something went wrong',
                text: "Please Try Again Later",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Yes'
            });
        }
    };
    return (
        <div className="container-fluid">
            {/* ... Your JSX code ... */}
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-4 col-form-label">Product Name<span className="text-danger">*</span></label>
                    <div className="col-sm-7">
                        <input type="text" required className="form-control" id="name" name="name" placeholder="ex. ICSI Micromanipulator" onChange={handleFormChange} />
                    </div>
                </div>
                {/* ... Rest of your form fields ... */}
                <button type="submit" className="btn btn-success waves-effect waves-light mr-1">Save</button>
            </form>
            {/* ... Rest of your JSX code ... */}
        </div>
    );
};

export default InventoryManagement;