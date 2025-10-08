module "app" {
  source = "../../modules/app"

  jwt_secret           = var.jwt_secret
  port                 = var.port
  google_client_id     = var.google_client_id
  google_client_secret = var.google_client_secret

  providers = {
    aws = aws
  }
}

output "api_endpoint" {
  value = module.app.base_url
}