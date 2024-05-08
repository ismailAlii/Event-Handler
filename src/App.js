import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EventsPage, { loader as eventsLoader } from './pages/EventsPage'
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetailPage'
import NewEventPage from './pages/NewEventPage'
import EditEventPage from './pages/EditEventPage'
import RootLayout from './pages/RootLayout'
import EventsLayout from './pages/EventsLayout'
import ErrorPage from './pages/ErrorPage'
import { action as manipulateEventAction } from './components/EventForm'
import NewsletterPage, {
  action as newsletterAction,
} from './pages/NewsletterPage'

// test comment

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/events',
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                action: deleteEventAction,
                element: <EventDetailPage />,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
