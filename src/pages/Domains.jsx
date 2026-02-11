import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { SearchIcon, GlobeIcon, CheckIcon, XIcon } from 'lucide-react';

export default function Domains() {
  const [domains, setDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    try {
      const data = await api.fetch('/api/domains');
      setDomains(data);
    } catch (error) {
      console.error('Failed to load domains:', error);
    }
  };

  const searchDomain = async () => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const result = await api.fetch(`/api/domains/check/${searchTerm}`);
      setSearchResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const purchaseDomain = async (domain) => {
    try {
      await api.fetch('/api/domains/purchase', {
        method: 'POST',
        body: JSON.stringify({ domain, years: 1 }),
      });
      setSuccessMessage('Domain purchased successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
      loadDomains();
      setSearchResult(null);
    } catch (error) {
      setError('Purchase failed: ' + error.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">🌐 Domain Management</h1>
        <p className="text-gray-600">Search, purchase, and manage your domains</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <SearchIcon
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchDomain()}
              placeholder="Search for a domain (e.g., myawesomesite.com)"
              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={searchDomain}
            disabled={loading || !searchTerm}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Search Result */}
        {searchResult && (
          <div className="mt-4 rounded-lg border p-4">
            {searchResult.available ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {searchResult.domain} is available!
                    </p>
                    <p className="text-sm text-gray-600">${searchResult.price.registration}/year</p>
                  </div>
                </div>
                <button
                  onClick={() => purchaseDomain(searchResult.domain)}
                  className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                >
                  Purchase Now
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <XIcon className="text-red-600" size={20} />
                </div>
                <p className="font-semibold text-gray-900">
                  {searchResult.domain} is not available
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* My Domains */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">My Domains ({domains.length})</h2>

        {domains.length === 0 ? (
          <p className="py-8 text-center text-gray-500">No domains yet. Search for one above!</p>
        ) : (
          <div className="space-y-3">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <GlobeIcon size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{domain.domain_name}</p>
                    <div className="mt-1 flex gap-4 text-sm text-gray-500">
                      <span
                        className={`font-medium ${
                          domain.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                        }`}
                      >
                        {domain.status}
                      </span>
                      {domain.ssl_enabled && <span>🔒 SSL</span>}
                      <span>{domain.dns_record_count} DNS records</span>
                    </div>
                  </div>
                </div>
                <button className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                  Manage
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
