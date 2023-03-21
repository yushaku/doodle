#!/bin/bash

curl --location --request GET 'http://localhost:8005/files' | pino-pretty
