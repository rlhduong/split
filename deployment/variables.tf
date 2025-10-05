variable "jwt_secret" {
  type      = string
  sensitive = true
}

variable "port" {
  type      = number
  sensitive = true
}

variable "google_client_id" {
  type      = string
  sensitive = true
}

variable "google_client_secret" {
  type      = string
  sensitive = true
}

variable "localstack" {
  description = "Deploy to LocalStack if true, otherwise to real AWS"
  type        = bool
  default     = true
}

variable "node_env" {
  type    = string
  default = "stage"
}