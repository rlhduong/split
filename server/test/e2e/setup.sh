docker-compose up -d
cd ../../../deployment/
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test

until curl -s -o /dev/null http://localhost:4566/_localstack/health; do
  echo "Waiting for LocalStack...😺"
  sleep 2
done
echo "LocalStack is up and running! 😼"
terraform init
terraform apply -auto-approve

API_ID=$(aws --endpoint-url=http://localhost:4566 apigatewayv2 get-apis \
  --query "Items[0].ApiId" --output text)

API="http://${API_ID}.execute-api.localhost.localstack.cloud:4566/dev/_user_request_"
echo "export API=$API" >> "$HOME/.bashrc"
echo "export API=$API"
curl -X POST  "$API/users/register"  -H "Content-Type: application/json"   -d '{"email":"test@test.com","password":"123456"}'
# echo "API=$API" >> "$GITHUB_ENV"