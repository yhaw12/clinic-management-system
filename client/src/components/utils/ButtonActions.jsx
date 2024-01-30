import Swal from 'sweetalert2';
import axios from 'axios';

export const deleteConfirmation = (id, records, setRecords, setFilterItems) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updateRecords = records.filter(row=>row.id !== id);
        setRecords(updateRecords);
        setFilterItems(updateRecords);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      })
      .catch(err=>console.log(err))
    }
  })
}

export const deleteConfirmationLabCat = async (id, records, setRecords, setFilterItems) => {
  try {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).isConfirmed;

    if (confirmed) {
      const response = await axios.delete(`http://localhost:8081/labcategory/${id}`);

      if (response?.status === 200) {
        const updatedRecords = records.filter((record) => record.id !== id);
        setRecords(updatedRecords);
        setFilterItems(updatedRecords);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    Swal.fire('Error!', 'There was a problem deleting the record.', 'error');
  }
};
 