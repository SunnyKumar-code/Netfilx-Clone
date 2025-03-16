import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './Login'
import Browse from './Browse'
import SearchResults from './SearchResults'
import ErrorBoundary from './ErrorBoundary'
import MovieDetails from './MovieDetails'
import ProtectedRoute from './ProtectedRoute'
import TVShows from './TVShows'
import Movies from './Movies'
import NewAndPopular from './NewAndPopular'
import MyList from './MyList'

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorBoundary />
    },
    {
      path: "/browse",
      element: <ProtectedRoute><Browse /></ProtectedRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      path: "/browse/:movieId",
      element: <ProtectedRoute><MovieDetails /></ProtectedRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      path: "/search",
      element: <ProtectedRoute><SearchResults /></ProtectedRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      path: "/tv-shows",
      element: <ProtectedRoute><TVShows /></ProtectedRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      path: "/movies",
      element: <ProtectedRoute><Movies /></ProtectedRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      path: "/new-and-popular",
      element: <ProtectedRoute><NewAndPopular /></ProtectedRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      path: "/my-list",
      element: <ProtectedRoute><MyList /></ProtectedRoute>,
      errorElement: <ErrorBoundary />
    }
  ])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
