module "app" {
  source = "../../modules/app"

  jwt_secret            = var.jwt_secret
  port                  = var.port
  google_client_id      = var.google_client_id
  google_client_secret  = var.google_client_secret
  tripping_frontend_url = var.tripping_frontend_url

  providers = {
    aws = aws
  }
}