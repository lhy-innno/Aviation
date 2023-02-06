import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import MainEntry from '@/views/main'
import Home from '@/views/home'
import { Navigate } from 'react-router-dom'
import Login from '@/views/login'
import Signup from '@/views/signup'

export function MainRoutes() {
	return useRoutes([
		{
			path: '/',
			element: <MainEntry />,
			children: [
				{
					path: '/',
					element: <Navigate to="/home" />
				},
				{
					path: '/home',
					element: <Home />
				},
				{
					path: '/login',
					element: <Login />
				},
				{
					path: '/signup',
					element: <Signup />
				}
			]
		}
	])
}
