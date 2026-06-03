variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos principales."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre del proyecto usado como prefijo de recursos."
  type        = string
  default     = "proyecto-devops"
}

variable "environment" {
  description = "Ambiente de despliegue de la infraestructura."
  type        = string
  default     = "dev"
}

variable "app_table_name" {
  description = "Nombre de la tabla DynamoDB de la aplicación."
  type        = string
  default     = "proyecto-devops-app-table"
}