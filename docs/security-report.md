# Reporte de Seguridad - Proyecto DevOps

## Objetivo

Documentar los controles DevSecOps aplicados al proyecto `proyecto-devops`, incluyendo análisis de vulnerabilidades, detección de secretos, gestión de secretos en Kubernetes y escaneo básico de seguridad web.

## Controles aplicados

| Control                                       | Herramienta             |
| --------------------------------------------- | ----------------------- |
| Análisis de vulnerabilidades en imagen Docker | Trivy                   |
| Análisis de vulnerabilidades en filesystem    | Trivy                   |
| Detección de secretos                         | Gitleaks                |
| Hook pre-commit                               | Gitleaks                |
| Gestión de secretos                           | Kubernetes Secrets      |
| Escaneo dinámico básico                       | OWASP ZAP Baseline Scan |

## Resultado Trivy

Se ejecutó Trivy sobre la imagen Docker de la aplicación y sobre el filesystem del repositorio, filtrando vulnerabilidades de severidad crítica.

Archivos generados:

```text
security/trivy-image-report.txt
security/trivy-fs-report.txt
```
