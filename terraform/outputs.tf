output "app_artifacts_bucket_name" {
  description = "Nombre del bucket S3 creado para artefactos de la aplicación."
  value       = aws_s3_bucket.app_artifacts.bucket
}

output "ecr_repository_name" {
  description = "Nombre del repositorio ECR creado para imágenes Docker."
  value       = aws_ecr_repository.app_repository.name
}

output "ecr_repository_url" {
  description = "URL del repositorio ECR para publicar imágenes Docker."
  value       = aws_ecr_repository.app_repository.repository_url
}

output "app_dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB creada para la aplicación."
  value       = aws_dynamodb_table.app_table.name
}

output "cloudwatch_log_group_name" {
  description = "Nombre del grupo de logs CloudWatch creado para la aplicación."
  value       = aws_cloudwatch_log_group.app_logs.name
}