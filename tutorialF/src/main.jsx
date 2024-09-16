import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './pages/App'
import './index.css'
import Apply from './pages/apply'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='login' element={<Login />} />

				<Route path='dashboard' element={<Dashboard />} />
				<Route path='apply' element={<Apply />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

