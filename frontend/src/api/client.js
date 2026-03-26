const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
    async register(data) {
        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async login(email, password) {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    async getListings(category = null, maxKm = 4.0) {
        let url = `${API_BASE}/listings?max_km=${maxKm}`;
        if (category) url += `&category=${encodeURIComponent(category)}`;
        
        const res = await fetch(url, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error('Failed to fetch listings');
        return res.json();
    },

    async createListing(data) {
        const res = await fetch(`${API_BASE}/listings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create listing');
        return res.json();
    },

    async deleteListing(id) {
        const res = await fetch(`${API_BASE}/listings/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error('Failed to delete listing');
        return res.json();
    },

    async enroll(listingId, type = 'enroll') {
        const res = await fetch(`${API_BASE}/enrollments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
            body: JSON.stringify({ listing_id: listingId, type })
        });
        if (!res.ok) throw new Error('Failed to enroll');
        return res.json();
    },

    async getLearnerEnrollments() {
        const res = await fetch(`${API_BASE}/enrollments/learner`, {
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error('Failed to fetch enrollments');
        return res.json();
    },

    async getTeacherEnrollments() {
        const res = await fetch(`${API_BASE}/enrollments/teacher`, {
            headers: getAuthHeaders()
        });
        if (!res.ok) throw new Error('Failed to fetch requests');
        return res.json();
    },

    async updateEnrollmentStatus(id, status) {
        const res = await fetch(`${API_BASE}/enrollments/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Failed to update status');
        return res.json();
    }
};
