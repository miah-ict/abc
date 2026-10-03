export const getItems = async () => {
  const res = await fetch('/api/items');
  return await res.json();
};

export const createItem = async (itemData) => {
  const res = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  return await res.json();
};

export const updateItem = async (id, itemData) => {
  const res = await fetch(`/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  return await res.json();
};

export const deleteItem = async (id) => {
  const res = await fetch(`/api/items/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
};
