import { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import ShipmentTable from '../components/ShipmentTable.jsx';
import Sidebar from '../components/Sidebar.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import { fetchShipments } from '../api/shipmentsApi.js';

const PAGE_SIZE = 100;
const LOAD_SIZE = 25;
const LOADS_PER_PAGE = PAGE_SIZE / LOAD_SIZE;

function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inTransit: 0,
    completed: 0
  });

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [loadPage, setLoadPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    totalPages: 1
  });

  useEffect(() => {
    async function loadShipments() {
      try {
        if (loadPage === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        setError('');

        const apiPage = (page - 1) * LOADS_PER_PAGE + loadPage;
        const response = await fetchShipments(apiPage, LOAD_SIZE);
        const shipmentData = response?.shipping_data?.data || [];
        const shippingMeta = response?.shipping_data || {};
        const apiStats = response?.stats || {};

        setStats({
          total: apiStats.total_shipments || 0,
          pending: apiStats.pending || 0,
          inTransit: apiStats.delivered || 0,
          completed: apiStats.completed || 0
        });

        setPagination({
          page,
          pageSize: PAGE_SIZE,
          total: shippingMeta.total || shipmentData.length,
          totalPages: Math.ceil((shippingMeta.total || shipmentData.length) / PAGE_SIZE) || 1
        });
        setShipments((currentShipments) => (
          loadPage === 1 ? shipmentData : [...currentShipments, ...shipmentData]
        ));
      } catch (err) {
        setError(err.message || 'Something went wrong while loading shipments.');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    loadShipments();
  }, [page, loadPage]);

  const currentPageLimit = Math.min(
    PAGE_SIZE,
    Math.max(pagination.total - (page - 1) * PAGE_SIZE, 0)
  );

  const canLoadMore = loadPage < LOADS_PER_PAGE && shipments.length < currentPageLimit;

  const handleLoadMore = useCallback(() => {
    if (loading || loadingMore || !canLoadMore) return;

    setLoadPage((currentPage) => currentPage + 1);
  }, [canLoadMore, loading, loadingMore]);

  function handlePreviousPage() {
    if (page <= 1 || loading || loadingMore) return;

    setShipments([]);
    setLoadPage(1);
    setPage((currentPage) => currentPage - 1);
  }

  function handleNextPage() {
    if (page >= pagination.totalPages || loading || loadingMore) return;

    setShipments([]);
    setLoadPage(1);
    setPage((currentPage) => currentPage + 1);
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header />

        <section className="summary-grid">
          <SummaryCard label="Total Shipments" value={stats.total} tone="tone-blue" />
          <SummaryCard label="Pending" value={stats.pending} tone="tone-orange" />
          <SummaryCard label="In Transit / Delivery" value={stats.inTransit} tone="tone-sky" />
          <SummaryCard label="Completed" value={stats.completed} tone="tone-green" />
        </section>

        {loading && <div className="state-card">Loading shipments...</div>}

        {error && !loading && (
          <div className="state-card error-card">{error}</div>
        )}

        {!loading && !error && shipments.length > 0 && (
          <ShipmentTable
            shipments={shipments}
            pagination={pagination}
            loadingMore={loadingMore}
            canLoadMore={canLoadMore}
            onLoadMore={handleLoadMore}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        )}

        {!loading && !error && shipments.length === 0 && (
          <div className="state-card">No shipment table data available.</div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
