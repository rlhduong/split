resource "null_resource" "build_app" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command     = "bash build.sh"
    working_dir = "${path.module}/../server"
  }
}
data "archive_file" "app" {
  type        = "zip"
  source_dir  = "${path.module}/../server"
  output_path = "${path.module}/../server.zip"

  depends_on = [
    null_resource.build_app
  ]
}

// lambda function
resource "aws_lambda_function" "app" {
  filename         = data.archive_file.app.output_path
  function_name    = "SPLIT_app"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "dist/index.handler"
  runtime          = "nodejs18.x"
  timeout          = 15
  source_code_hash = data.archive_file.app.output_base64sha256

  environment {
    variables = {
      PORT           = 8080
      JWT_SECRET_KEY = var.jwt_secret
    }
  }
}

resource "aws_lambda_permission" "api_gw_app" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.app.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda_api.execution_arn}/*/*"
}

resource "aws_apigatewayv2_integration" "app" {
  api_id             = aws_apigatewayv2_api.lambda_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.app.invoke_arn
  integration_method = "POST"
  payload_format_version  = "2.0"
}

resource "aws_apigatewayv2_route" "app" {
  api_id    = aws_apigatewayv2_api.lambda_api.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.app.id}"
}