<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>React DataTable</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/styled-components/dist/styled-components.min.js"></script>
  <script src="https://unpkg.com/react-data-table-component@7.5.0/dist/react-data-table-component.min.js"></script>
</head>
<body style="margin: 0; font-family: 'Roboto', sans-serif; background: #f0f2f5; padding: 20px;">
  <div id="data-table-root"></div>

  <script type="text/javascript">
    const { createElement } = React;
    const { render } = ReactDOM;
    const DataTable = window["ReactDataTableComponent"].default;

    const columns = [
      { name: 'Name', selector: row => row.name, sortable: true },
      { name: 'Role', selector: row => row.role },
      { name: 'Email', selector: row => row.email },
      { name: 'Status', selector: row => row.status, cell: row => 
        React.createElement('span', {
          style: {
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: row.status === 'Active' ? '#d1f7c4' : '#ffd4d4',
            color: row.status === 'Active' ? '#317a1e' : '#a50e0e',
            fontWeight: '500'
          }
        }, row.status)
      }
    ];

    const data = [
      { name: 'David Sallusti', role: 'CTO', email: 'david@example.com', status: 'Active' },
      { name: 'Lana Rivera', role: 'Designer', email: 'lana@example.com', status: 'Inactive' },
      { name: 'Tommy Xu', role: 'Engineer', email: 'tommy@example.com', status: 'Active' },
      { name: 'Nina Khalid', role: 'Analyst', email: 'nina@example.com', status: 'Inactive' }
    ];

    const customStyles = {
      headCells: {
        style: {
          fontWeight: '700',
          fontSize: '14px',
          backgroundColor: '#e3f2fd',
        },
      },
      rows: {
        style: {
          fontSize: '14px',
        },
      },
    };

    const App = () =>
      createElement(DataTable, {
        title: '📋 Team Overview',
        columns,
        data,
        pagination: true,
        highlightOnHover: true,
        customStyles
      });

    render(createElement(App), document.getElementById('data-table-root'));
  </script>
</body>
</html>
