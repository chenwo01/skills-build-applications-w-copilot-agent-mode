import { useCallback, useEffect, useMemo, useState } from 'react';

function formatCellValue(value) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (Array.isArray(value)) {
    return value.length === 0 ? '-' : value.map((item) => formatCellValue(item)).join(', ');
  }

  if (typeof value === 'object') {
    return value.name || value.username || value.email || value.id || JSON.stringify(value);
  }

  return String(value);
}

function formatFieldLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isIdField(key) {
  return key.toLowerCase() === 'id' || key.toLowerCase() === '_id';
}

function renderDetailValue(value) {
  if (value === null || value === undefined || value === '') {
    return <span className="text-muted">-</span>;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return <span>{value}</span>;
  }

  if (typeof value === 'boolean') {
    return <span>{value ? 'Yes' : 'No'}</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-muted">-</span>;
    }

    return (
      <div className="d-flex flex-wrap gap-2">
        {value.map((entry, index) => (
          <span key={`detail-array-${index}`} className="badge text-bg-light border">
            {formatCellValue(entry)}
          </span>
        ))}
      </div>
    );
  }

  if (typeof value === 'object') {
    const nestedEntries = Object.entries(value).filter(([nestedKey]) => !isIdField(nestedKey));

    return (
      <div className="card border-0 bg-light-subtle">
        <div className="card-body py-2 px-3">
          <div className="table-responsive">
            <table className="table table-sm table-bordered align-middle mb-0">
              <tbody>
                {nestedEntries.map(([nestedKey, nestedValue]) => (
                  <tr key={nestedKey}>
                    <th scope="row" className="small text-uppercase text-secondary">
                      {formatFieldLabel(nestedKey)}
                    </th>
                    <td>{formatCellValue(nestedValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <span>{String(value)}</span>;
}

function ResourceTableCard({ title, endpoint, columns, sortItems }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = useCallback(async () => {
    try {
      setError('');
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`${title} fetch failed: ${response.status}`);
      }

      const data = await response.json();

      const normalized = Array.isArray(data) ? data : data.results || [];
      setItems(normalized);
    } catch (err) {
      setError(err.message);
      console.error(`${title} fetch error:`, err);
    }
  }, [endpoint, title]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const filteredItems = useMemo(() => {
    const preparedItems = sortItems ? [...items].sort(sortItems) : items;

    if (!query.trim()) {
      return preparedItems;
    }

    const needle = query.toLowerCase();
    return preparedItems.filter((item) => JSON.stringify(item).toLowerCase().includes(needle));
  }, [items, query, sortItems]);

  return (
    <section className="mb-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-bottom-0 pt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
            <h2 className="h4 mb-0 text-dark fw-semibold">{title}</h2>
            <a
              href={endpoint}
              target="_blank"
              rel="noreferrer"
              className="link-primary fw-medium"
            >
              Open API endpoint
            </a>
          </div>
        </div>

        <div className="card-body">
          <form
            className="row g-2 align-items-end mb-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="col-12 col-md-6">
              <label htmlFor={`${title}-search`} className="form-label fw-semibold">
                Search records
              </label>
              <input
                id={`${title}-search`}
                type="text"
                className="form-control"
                placeholder="Filter table rows"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-12 col-md-auto d-flex gap-2">
              <button type="button" className="btn btn-primary" onClick={loadItems}>
                Refresh
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
                Clear
              </button>
            </div>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: '56px' }}>#</th>
                  {columns.map((column) => (
                    <th key={column.label} scope="col">
                      {column.label}
                    </th>
                  ))}
                  <th scope="col" className="text-end" style={{ width: '120px' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 2} className="text-center py-4 text-muted">
                      No records found.
                    </td>
                  </tr>
                )}
                {filteredItems.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    <th scope="row">{index + 1}</th>
                    {columns.map((column) => (
                      <td key={`${column.label}-${index}`}>{formatCellValue(column.render(item))}</td>
                    ))}
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedItem(item)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} Record Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle mb-0">
                          <tbody>
                            {Object.entries(selectedItem)
                              .filter(([key]) => !isIdField(key))
                              .map(([key, value]) => (
                              <tr key={key}>
                                <th scope="row" className="small text-uppercase text-secondary">
                                  {formatFieldLabel(key)}
                                </th>
                                <td>{renderDetailValue(value)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </section>
  );
}

export default ResourceTableCard;