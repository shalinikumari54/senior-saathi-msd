import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from '../components/Card';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchRequests();
    }
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await api.put(`/requests/${requestId}/accept`);
      fetchRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleCompleteRequest = async (requestId) => {
    try {
      await api.put(`/requests/${requestId}/complete`);
      fetchRequests();
    } catch (error) {
      console.error('Error completing request:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-8">Please log in to access your dashboard.</div>;
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card title="Total Requests">
        <div className="text-3xl font-bold text-primary">
          {user.role === 'senior' ? requests.length : requests.filter(r => r.status === 'pending').length}
        </div>
      </Card>
      <Card title="Active Requests">
        <div className="text-3xl font-bold text-accent">
          {requests.filter(r => r.status === 'accepted').length}
        </div>
      </Card>
      <Card title="Completed">
        <div className="text-3xl font-bold text-green-600">
          {requests.filter(r => r.status === 'completed').length}
        </div>
      </Card>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          {user.role === 'senior' ? 'No requests yet. Create your first request!' : 'No requests available.'}
        </p>
      ) : (
        requests.map((request) => (
          <Card key={request._id}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{request.description}</h3>
                <p className="text-gray-600">Location: {request.location}</p>
                <p className="text-gray-600">Urgency: {request.urgency}</p>
                <p className="text-gray-600">Status: <span className={`font-medium ${
                  request.status === 'pending' ? 'text-yellow-600' :
                  request.status === 'accepted' ? 'text-blue-600' :
                  'text-green-600'
                }`}>{request.status}</span></p>
                {request.seniorId && (
                  <p className="text-gray-600">Senior: {request.seniorId.name}</p>
                )}
                {request.volunteerId && (
                  <p className="text-gray-600">Volunteer: {request.volunteerId.name}</p>
                )}
              </div>
              <div className="flex space-x-2">
                {user.role === 'volunteer' && request.status === 'pending' && (
                  <button
                    onClick={() => handleAcceptRequest(request._id)}
                    className="btn-primary"
                  >
                    Accept
                  </button>
                )}
                {user.role === 'volunteer' && request.status === 'accepted' && request.volunteerId._id === user._id && (
                  <button
                    onClick={() => handleCompleteRequest(request._id)}
                    className="btn-primary bg-green-600 hover:bg-green-700"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {user.role === 'senior' ? 'My Requests' : 'Available Requests'}
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'requests' && renderRequests()}
    </div>
  );
};

export default Dashboard;
