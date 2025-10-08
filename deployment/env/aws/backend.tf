terraform {
  backend "s3" {
    bucket         = "tripping-terraform-state"
    key            = "terraform.tfstate"
    region         = "ap-southeast-2"
    dynamodb_table = "tripping_terraform_locks"
    encrypt        = true
  }
}

resource "aws_s3_bucket" "terraform_state" {
  bucket        = "tripping-terraform-state"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_encryption" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "terraform_lock" {
  name         = "tripping_terraform_locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}