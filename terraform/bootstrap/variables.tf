variable "aws_region" {
  description = "Región de AWS donde se crearán los recursos base de Terraform."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre base del proyecto utilizado para nombrar recursos."
  type        = string
  default     = "proyecto-devops"
}