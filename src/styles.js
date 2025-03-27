const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#4A4A4A',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '60px',
    padding: '20px',
    width: '100%',
    maxWidth: '1200px',
  },
  chatInterface: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  feedbackSystem: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  shareButton: {
    padding: '12px 24px',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
  },
  feedbackOverview: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default styles;