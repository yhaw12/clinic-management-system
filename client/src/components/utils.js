function downloadCSV(data) {
    const csvData = data.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'data.csv';
    link.href = url;
    link.click();
}

export { downloadCSV };


