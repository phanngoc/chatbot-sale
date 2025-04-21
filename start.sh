#!/bin/bash

# Khởi chạy backend
cd backend && npm run dev &

# Khởi chạy frontend 
cd frontend && npm run dev &

# Chờ cả 2 process
wait