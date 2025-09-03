terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region     = "ap-southeast-2"
  access_key = var.use_localstack ? "test" : null
  secret_key = var.use_localstack ? "test" : null

  s3_use_path_style           = var.use_localstack
  skip_credentials_validation = var.use_localstack
  skip_requesting_account_id  = var.use_localstack

  dynamic "endpoints" {
    for_each = var.use_localstack ? [1] : []
    content {
      apigateway     = "http://localhost:4566"
      apigatewayv2   = "http://localhost:4566"
      cloudwatch     = "http://localhost:4566"
      cloudwatchlogs = "http://localhost:4566"
      dynamodb       = "http://localhost:4566"
      iam            = "http://localhost:4566"
      lambda         = "http://localhost:4566"
      s3             = "http://localhost:4566"
      sts            = "http://localhost:4566"
    }
  }
}
