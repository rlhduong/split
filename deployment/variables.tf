variable "jwt_secret" {
  type      = string
  sensitive = true
}

variable "use_localstack" {
  description = "Deploy to LocalStack if true, otherwise to real AWS"
  type        = bool
  default     = true
}