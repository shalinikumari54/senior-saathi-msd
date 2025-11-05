import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from '../components/Card';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState('');
  const [formData, setFormData] = useState({
    message: '',
    rating: 5,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [feedbacksRes, requestsRes] = await Promise.all([
        api.get('/feedback'),
        api.get('/requests'),
      ]);

      setFeedbacks(feedbacksRes.data);
      // Filter completed requests for feedback
      setRequests(requestsRes.data.filter(r => r.status === 'completed'));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    setSubmitting(true);
    try {
      await api.post('/feedback', {
        requestId: selectedRequest,
        ...formData,
      });

      setFormData({ message: '', rating: 5 });
      setSelectedRequest('');
      fetchData();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Feedback</h1>
        <p className="text-gray-600">Share your experience and help us improve our services.</p>
      </div>

      {/* Submit Feedback Form */}
      <Card title="Submit Feedback" className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="request" className="block text-sm font-medium text-text mb-1">
              Select Completed Request
            </label>
            <select
              id="request"
              value={selectedRequest}
              onChange={(e) => setSelectedRequest(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Choose a request...</option>
              {requests.map((request) => (
                <option key={request._id} value={request._id}>
                  {request.description} - {new Date(request.createdAt).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-text mb-1">
              Rating (1-5 stars)
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="input-field"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
              <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
              <option value={3}>⭐⭐⭐ (3 stars)</option>
              <option value={2}>⭐⭐ (2 stars)</option>
              <option value={1}>⭐ (1 star)</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
              Your Feedback
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="input-field"
              placeholder="Tell us about your experience..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting || !selectedRequest}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </Card>

      {/* Feedback List */}
      <div>
        <h2 className="text-2xl font-bold text-text mb-6">Recent Feedback</h2>
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No feedback yet.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <Card key={feedback._id}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{feedback.userId.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-yellow-500">
                    {'⭐'.repeat(feedback.rating)}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{feedback.message}</p>
                <p className="text-sm text-gray-600">
                  Request: {feedback.requestId.description}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
