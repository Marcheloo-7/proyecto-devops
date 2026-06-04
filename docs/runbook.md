# Runbook de Observabilidad - Proyecto DevOps

## Objetivo

Definir los pasos de diagnóstico y recuperación cuando se active una alerta relacionada con la disponibilidad de la aplicación Proyecto DevOps.

---

## Alerta: ProyectoDevopsAppDown

### Descripción

La alerta `ProyectoDevopsAppDown` indica que Prometheus no puede recolectar métricas desde la aplicación Proyecto DevOps durante más de 1 minuto.

### Impacto

La aplicación puede estar caída, los pods pueden no estar disponibles o el endpoint `/actuator/prometheus` puede no estar respondiendo correctamente.

### Diagnóstico

1. Verificar el estado de los pods:

```bash
kubectl get pods -n devops-staging