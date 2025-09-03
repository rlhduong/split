output "base_url" {
  description = "Base URL for API Gateway stage."
  value       = aws_apigatewayv2_stage.lambda_stage.invoke_url
}

output "stage_url" {
  description = "Base URL for API Gateway stage."
  value       = "${aws_apigatewayv2_api.lambda_api.api_endpoint}/${aws_apigatewayv2_stage.lambda_stage.name}"
}

