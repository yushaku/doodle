#!/bin/bash

function register() {
	curl -X POST http://localhost:8005/auth/register \
		-H "Content-Type: application/json" \
		-d '{"email": "yushaku@gmail.com", "name": "yushaku", "password": "changeme"}' | pino-pretty
}

function login() {
	curl -X POST http://localhost:8005/auth/login \
		-H "Content-Type: application/json" \
		-d '{"email": "yushaku@gmail.com", "password": "changeme"}'
}

"$1"
