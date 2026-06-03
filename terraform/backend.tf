terraform {
  backend "s3" {
    bucket         = "proyecto-devops-tfstate-610558658357"
    key            = "proyecto-devops/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "proyecto-devops-terraform-locks"
    encrypt        = true
  }
}