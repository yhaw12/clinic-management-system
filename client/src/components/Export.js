import PropTypes from 'prop-types';

function Export({ onExport }) {
    return (
        <button onClick={onExport}
         style={{position: 'relative', backgroundColor: '#0C6B79', color: 'white', padding: '8px 32px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer' }}>
            Export
        </button>
    );
}

Export.propTypes = {
    onExport: PropTypes.func.isRequired,
};

export default Export;
