output "tfstate_bucket_name" {
  description = "Nombre del bucket S3 usado como backend remoto de Terraform."
  value       = "proyecto-devops-tfstate-610558658357"
}

output "dynamodb_lock_table_name" {
  description = "Nombre de la tabla DynamoDB usada para bloquear el estado de Terraform."
  value       = aws_dynamodb_table.terraform_locks.name
}

output "aws_account_id" {
  description = "ID de la cuenta AWS donde se crearon los recursos."
  value       = data.aws_caller_identity.current.account_id
}