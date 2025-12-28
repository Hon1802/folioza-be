#!/bin/bash
version=$(date +%Y%m%d%H%M%S)
desc=$1
filename="V${version}__${desc// /_}.sql"
touch "src/migrations/sqls/$filename"
echo "-- Migration: $desc" > "src/migrations/sqls/$filename"
echo "Created $filename"
