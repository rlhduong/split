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

variable "domain_name" {
  type      = string
  sensitive = true
}