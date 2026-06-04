# Definición de SLI/SLO - Proyecto DevOps

## Objetivo

Definir los indicadores de nivel de servicio utilizados para evaluar la disponibilidad de la aplicación Proyecto DevOps desplegada en Kubernetes y monitoreada con Prometheus y Grafana.

## SLI 1: Disponibilidad

La disponibilidad se mide mediante la métrica `up` de Prometheus.

Esta métrica indica si Prometheus puede recolectar correctamente las métricas de la aplicación desde el endpoint `/actuator/prometheus`.

Consulta PromQL:

```promql
100 * avg(avg_over_time(up{job="proyecto-devops"}[5m]))