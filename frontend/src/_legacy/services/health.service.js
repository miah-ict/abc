export const getHealthStatus = async () => {
  try {
    const res = await fetch('/api/health');
    return await res.json();
  } catch (err) {
    return {
      status: 'offline',
      error: 'Backend API service unreachable'
    };
  }
};
