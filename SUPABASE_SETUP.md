# Supabase Setup Guide

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth (if using)
GOOGLE_CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback/google

# Database (if using separate PostgreSQL)
DATABASE_URL=your_database_url
```

## 2. Database Setup

### Run the SQL Schema

Copy and paste the contents of `database-schema.sql` into your Supabase SQL editor and run it. This will create:

- **profiles** table (extends auth.users)
- **todos** table for todo items
- Row Level Security (RLS) policies
- Triggers for automatic profile creation
- Indexes for better performance

### Table Structure

#### profiles table:
- `id` (UUID, Primary Key) - References auth.users(id)
- `email` (TEXT, Unique) - User's email
- `full_name` (TEXT) - User's full name
- `avatar_url` (TEXT) - Profile picture URL
- `created_at` (TIMESTAMP) - Account creation date
- `updated_at` (TIMESTAMP) - Last update date

#### todos table:
- `id` (UUID, Primary Key) - Todo item ID
- `user_id` (UUID) - References auth.users(id)
- `title` (TEXT) - Todo title
- `description` (TEXT) - Todo description
- `completed` (BOOLEAN) - Completion status
- `priority` (TEXT) - Priority level (low/medium/high)
- `due_date` (TIMESTAMP) - Due date
- `created_at` (TIMESTAMP) - Creation date
- `updated_at` (TIMESTAMP) - Last update date

## 3. Authentication Features

### Sign Up
- Email/password registration
- Full name collection
- Email verification (optional)
- Form validation
- Error handling

### Sign In
- Email/password authentication
- Remember me functionality
- Error handling
- Redirect to todo list on success

### User Management
- Profile display in sidebar
- Logout functionality
- Session persistence
- Protected routes

## 4. Security Features

- Row Level Security (RLS) enabled
- Users can only access their own data
- Automatic profile creation on signup
- Token-based authentication
- Secure password handling

## 5. API Endpoints

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## 6. Getting Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and anon/public key
5. Add them to your `.env.local` file

## 7. Testing the Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. You should be redirected to `/login`
4. Click "Sign up" to create an account
5. After signup, verify your email (if enabled)
6. Sign in and access your todo list

## 8. Troubleshooting

### Common Issues:

1. **"Invalid API key"** - Check your Supabase URL and anon key
2. **"Table doesn't exist"** - Run the SQL schema in Supabase
3. **"RLS policy violation"** - Ensure RLS policies are created
4. **"User not found"** - Check if the trigger is working properly

### Debug Steps:

1. Check browser console for errors
2. Verify environment variables are loaded
3. Test Supabase connection in SQL editor
4. Check authentication logs in Supabase dashboard 