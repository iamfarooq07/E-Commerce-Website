import { useState, useEffect } from 'react';
import { foodAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useFoodItems = (filters = {}) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        const response = await foodAPI.getAllFood(filters);
        setFoodItems(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load food items');
        console.error('Error fetching food items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [JSON.stringify(filters)]);

  return { foodItems, loading, error };
};
