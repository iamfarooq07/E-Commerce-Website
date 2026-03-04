# Frontend-Backend Integration Guide

## 🎯 Overview
This guide explains how to connect your React frontend with the Node.js/Express backend.

## 📋 Prerequisites

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd React-Collection-Filter
npm install axios
```

3. **Setup Environment Variables**

Create `.env` in React-Collection-Filter:
```bash
VITE_API_URL=http://localhost:5000/api
```

Backend `.env` is already configured.

## 🚀 Quick Start

### Step 1: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if installed as service)
net start MongoDB

# Or using MongoDB Compass - just open it
```

### Step 2: Seed the Database
Populate your database with food items:
```bash
cd backend
npm run seed
```

### Step 3: Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

### Step 4: Start Frontend
```bash
cd React-Collection-Filter
npm run dev
```
Frontend will run on http://localhost:5173

## 🔄 Migration from Supabase to Custom Backend

### Option 1: Use New Backend Components (Recommended)

Replace your existing components with the new backend-integrated versions:

**In your App.jsx or routing file:**
```javascript
// OLD (Supabase)
import Login from './auth/Login';
import Signup from './auth/Signup';
import Checkout from './pages/Checkout';

// NEW (Custom Backend)
import Login from './auth/LoginBackend';
import Signup from './auth/SignupBackend';
import Checkout from './pages/CheckoutBackend';
```

### Option 2: Update Existing Components

If you want to keep your existing files, replace the Supabase code:

**Login.jsx - Replace Supabase import and login function:**
```javascript
// Remove this
import { supabase } from "@/supabase/Supabase";

// Add this
import { authAPI } from "@/services/api";

// Replace login function
const login = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await authAPI.login({ email, password });
    const { token, name, email: userEmail, _id } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ _id, name, email: userEmail }));

    setUser({ _id, name, email: userEmail });
    setIdName(name.charAt(0).toUpperCase());

    toast.success("Login Successfully", { autoClose: 2000 });
    navigate('/');
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
```

## 📦 Fetching Food Items from Backend

### Method 1: Using Custom Hook (Recommended)
```javascript
import { useFoodItems } from '@/hooks/useFoodItems';

function YourComponent() {
  const { foodItems, loading, error } = useFoodItems();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {foodItems.map(item => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  );
}
```

### Method 2: Direct API Call
```javascript
import { foodAPI } from '@/services/api';
import { useEffect, useState } from 'react';

function YourComponent() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await foodAPI.getAllFood();
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchFood();
  }, []);

  return <Products products={foodItems} />;
}
```

### Method 3: With Filters
```javascript
const { foodItems } = useFoodItems({
  category: 'burger',
  minPrice: 100,
  maxPrice: 300,
  search: 'chicken'
});
```

## 🛒 Checkout Integration

The new `CheckoutBackend.jsx` component includes:
- Form validation
- User authentication check
- Order creation with backend API
- Loading states
- Error handling

**Important:** Update your product data structure to use MongoDB `_id`:
```javascript
// When adding to cart, ensure you're using the _id from backend
const item = {
  id: product._id,  // MongoDB ID from backend
  title: product.name,
  price: product.price,
  image: product.imageURL,
  // ... other fields
};
```

## 🔐 Authentication Flow

1. **Signup**: User registers → Backend creates account → Redirect to login
2. **Login**: User logs in → Backend returns JWT token → Store in localStorage
3. **Protected Routes**: Token automatically added to all API requests
4. **Logout**: Clear localStorage and redirect

**Update AuthContext.jsx:**
```javascript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
  setIdName("");
  navigate('/login');
};
```

## 📝 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/user/profile` - Get user profile (Protected)

### Food Items
- `GET /api/food` - Get all food items
- `GET /api/food/:id` - Get single food item
- `POST /api/food` - Create food item (Admin only)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)

## 🔧 Troubleshooting

### CORS Issues
If you get CORS errors, make sure backend has:
```javascript
app.use(cors());
```

### Token Not Sent
Check that axios interceptor is configured in `api.js`

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check MONGODB_URI in backend/.env
- Default: `mongodb://localhost:27017/food-delivery`

### Products Not Loading
1. Run seed script: `cd backend && npm run seed`
2. Check backend console for errors
3. Verify API_URL in frontend .env

## 📊 Data Structure Mapping

### Frontend (Old) → Backend (New)
```javascript
// Frontend product structure
{
  id: 1,                    → _id: "507f1f77bcf86cd799439011"
  title: "Burger",          → name: "Burger"
  image: "/images/...",     → imageURL: "/images/..."
  price: 100,               → price: 100
  category: "Burger",       → category: "burger" (lowercase)
  description: "...",       → description: "..."
  rating: 5                 → rating: 5
}
```

## 🎨 UI Components Compatibility

Your existing UI components work with minimal changes:
- `ProductCard` - Update to use `product._id` and `product.name`
- `CartItem` - No changes needed
- `Products` - No changes needed
- `Checkout` - Use `CheckoutBackend.jsx`

## ✅ Testing Checklist

- [ ] Backend server running
- [ ] MongoDB connected
- [ ] Database seeded with products
- [ ] Frontend can fetch food items
- [ ] User can register
- [ ] User can login
- [ ] Token stored in localStorage
- [ ] Protected routes work
- [ ] User can place order
- [ ] Orders saved to database

## 🚀 Next Steps

1. Update your routing to use new components
2. Test authentication flow
3. Test order placement
4. Add admin dashboard for managing products
5. Implement order tracking
6. Add payment gateway integration
