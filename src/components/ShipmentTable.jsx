import { useEffect, useRef } from 'react';
import StatusBadge from './StatusBadge.jsx';
import { formatDate, formatText } from '../utils/formatters.js';

function getShipmentDate(shipment) {
  return (
    shipment.date ||
    shipment.shipment_date ||
    shipment.delivery_date ||
    shipment.created_at ||
    shipment.updated_at
  );
}

function ShipmentTable({
  shipments,
  pagination,
  loadingMore,
  canLoadMore,
  onLoadMore,
  onNextPage,
  onPreviousPage
}) {
  const loadMoreRef = useRef(null);
  const startRecord = (pagination.page - 1) * pagination.pageSize + 1;
  const endRecord = startRecord + shipments.length - 1;

  useEffect(() => {
    const currentElement = loadMoreRef.current;

    if (!currentElement || !canLoadMore) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMore) {
          onLoadMore();
        }
      },
      { rootMargin: '160px' }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [canLoadMore, loadingMore, onLoadMore]);

  return (
    <section className="table-card">
      <div className="table-header">
        <div>
          <h2>Recent Shipments</h2>
          <p>Showing the latest records from the shipping API.</p>
        </div>
        <span>
          Showing {startRecord}-{endRecord} of {pagination.total}
        </span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Shipping ID</th>
              <th>Company</th>
              <th>Product Category</th>
              <th>Weight</th>
              <th>Route</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => {
              const date = getShipmentDate(shipment);

              return (
                <tr key={shipment.shipping_id || index}>
                  <td className="strong-cell" data-label="Shipping ID">
                    {formatText(shipment.shipping_id)}
                  </td>
                  <td data-label="Company">{formatText(shipment.company_name)}</td>
                  <td data-label="Product Category">{formatText(shipment.product_category)}</td>
                  <td data-label="Weight">{shipment.weight ? `${shipment.weight} kg` : '-'}</td>
                  <td data-label="Route">{formatText(shipment.route)}</td>
                  <td data-label="Date">{formatDate(date)}</td>
                  <td data-label="Status">
                    <StatusBadge status={shipment.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="lazy-load-footer" ref={loadMoreRef}>
        {loadingMore && 'Loading more shipments...'}
        {!loadingMore && canLoadMore && 'Scroll to load 25 more records'}
        {!loadingMore && !canLoadMore && 'All records loaded for this page'}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          disabled={pagination.page <= 1 || loadingMore}
          onClick={onPreviousPage}
        >
          Previous
        </button>

        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          className="pagination-button"
          disabled={pagination.page >= pagination.totalPages || loadingMore}
          onClick={onNextPage}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default ShipmentTable;
