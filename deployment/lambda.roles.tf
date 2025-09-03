//base policy
resource "aws_iam_role" "iam_for_lambda" {
  name        = "SPLIT_iam_for_lambda"
  description = "IAM role for Lambda function"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

// policy for s3
resource "aws_iam_policy" "s3_lambda_policy" {
  name        = "SPLIT_s3_lambda_policy"
  description = "Allow lambda to access S3"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ]
      Resource = "*"
      # [
      # "arn:aws:s3:::${var.global_s3_name}",
      # "arn:aws:s3:::${var.global_s3_name}/*"
      # ]
    }]
  })
}

// policy for dynamodb
resource "aws_iam_policy" "dynamodb_lambda_policy" {
  name        = "SPLIT_dynamodb_lambda_policy"
  description = "Allow lambda to access DynamoDB"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ]
      Resource = "arn:aws:dynamodb:ap-southeast-2:686255973084:table/*"
      }, {
      Effect = "Allow"
      Action = [
        "dynamodb:CreateTable",
        "dynamodb:DeleteTable",
        "dynamodb:DescribeTable",
        "dynamodb:ListTables"
      ]
      Resource = "*"
    }]
  })
}

// attach to the base policy
resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

// attach to the base policy
resource "aws_iam_role_policy_attachment" "lambda_s3_policy_attachment" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.s3_lambda_policy.arn
}

// attach to the base policy
resource "aws_iam_role_policy_attachment" "lambda_dynamodb_policy_attachment" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.dynamodb_lambda_policy.arn
}


