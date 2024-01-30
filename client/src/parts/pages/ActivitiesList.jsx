import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const Activities = () => {
    const [data, setData] = useState([]);


    // will pull the data from the workers
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setData(result.data);
        };

        fetchData();
    }, []);

    const columns = [
        {
            name: 'S/N',
            selector: 'DT_RowIndex',
            sortable: true,
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
        },
        {
            name: 'Employees Name',
            selector: 'user_name',
            sortable: true,
        },
        {
            name: 'Activity',
            selector: 'activity',
            sortable: true,
        },
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="text-center my-6">
                            <h2 className="text-2xl font-semibold text-gray-700">Activities List</h2>
                        </div>
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <DataTable
                                columns={columns}
                                data={data}
                                noHeader
                                customStyles={{
                                    headCells: {
                                        style: {
                                            paddingLeft: '8px',
                                            'fontWeight': 'bold'
                                        },
                                    },
                                    cells: {
                                        style: {
                                            paddingLeft: '8px',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activities;