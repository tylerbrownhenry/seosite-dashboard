now=$(date +"%m-%d-%Y")
curl -X POST -H "Content-Type: application/json" \
    --data '{ "email":"random@email.com"}' \
    http://localhost:3000/signup
