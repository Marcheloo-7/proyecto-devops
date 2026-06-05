# Métricas DORA - Proyecto DevOps

## 1. Alcance de la medición

El período de medición comprende desde el 1 de junio de 2026 hasta el 5 de junio de 2026.

Para la medición se consideraron únicamente las ejecuciones exitosas del job `Deploy to Production` perteneciente al workflow `CD Pipeline`.

No se contabilizaron como deployments de producción:

* Ejecuciones del CI Pipeline.
* Despliegues a staging.
* Construcciones de imágenes Docker.
* Ejecuciones canceladas.
* Ejecuciones que no llegaron al job de producción.

El entorno de producción utilizado corresponde a un entorno de producción simulado mediante GitHub Environments. El archivo `cd.yml` ejecuta una simulación del despliegue después de la aprobación requerida.

## 2. Fuentes de información

Los datos fueron obtenidos mediante:

* Historial de commits de Git.
* GitHub Actions.
* Historial del environment `production`.
* Resultado de los jobs `Deploy to Production`.
* Enlaces de evidencia de cada ejecución.

## 3. Deployments registrados

| ID | Workflow       | Commit    | Fecha del commit | Finalización en producción |       Lead Time | Resultado | Causó fallo |
| -- | -------------- | --------- | ---------------- | -------------------------- | --------------: | --------- | ----------- |
| D1 | CD Pipeline #1 | `d5e27ab` | 02-jun 21:33:41  | 02-jun 21:43:53            |     10 min 12 s | Exitoso   | No          |
| D2 | CD Pipeline #3 | `053285d` | 03-jun 21:58:50  | 04-jun 21:03:46            | 23 h 4 min 56 s | Exitoso   | No          |
| D3 | CD Pipeline #4 | `76cef16` | 04-jun 21:22:48  | 04-jun 21:27:43            |      4 min 55 s | Exitoso   | No          |

---

## 4. Deployment Frequency

### Definición

Deployment Frequency mide cuántas veces se despliegan exitosamente cambios a producción durante un período determinado.

### Cálculo

Durante el período de cinco días se realizaron tres deployments exitosos:

```text
Deployment Frequency = 3 deployments / 5 días
Deployment Frequency = 0.6 deployments por día
```

Intervalo promedio:

```text
5 días / 3 deployments = 1.67 días por deployment
```

Normalizado a una semana:

```text
0.6 deployments por día × 7 días = 4.2 deployments por semana
```

### Resultado

El equipo realizó **3 deployments durante 5 días**, equivalente aproximadamente a **un deployment cada 1.67 días**.

Según los rangos utilizados por DORA 2024, el resultado se encuentra en el rango de despliegue **entre una vez al día y una vez por semana**.

---

## 5. Lead Time for Changes

### Definición

Lead Time for Changes mide el tiempo transcurrido desde que se realiza un commit hasta que el cambio termina ejecutándose exitosamente en producción.

No corresponde únicamente a la duración del pipeline. También incluye el tiempo que el cambio permanece esperando antes de ejecutarse el deployment.

### Lead Times individuales

| Deployment |                      Lead Time |
| ---------- | -----------------------------: |
| D1         |         10 minutos 12 segundos |
| D2         | 23 horas 4 minutos 56 segundos |
| D3         |          4 minutos 55 segundos |

### Lead Time promedio

```text
D1 = 612 segundos
D2 = 83,096 segundos
D3 = 295 segundos

Total = 84,003 segundos

Promedio = 84,003 / 3
Promedio = 28,001 segundos
Promedio = 7 horas 46 minutos 41 segundos
```

### Lead Time mediano

Ordenando los resultados:

```text
4 minutos 55 segundos
10 minutos 12 segundos
23 horas 4 minutos 56 segundos
```

La mediana corresponde a:

```text
10 minutos 12 segundos
```

### Resultado

El **Lead Time promedio fue de 7 horas 46 minutos 41 segundos**.

El **Lead Time mediano fue de 10 minutos 12 segundos**.

El promedio se vio afectado por el CD Pipeline #3, cuyo cambio permaneció aproximadamente 23 horas antes de ser desplegado a producción.

Según los rangos DORA 2024:

* El Lead Time promedio se encuentra en el rango de **menos de un día**.
* El Lead Time mediano se encuentra en el rango de **menos de una hora**.

---

## 6. Change Failure Rate

### Definición

Change Failure Rate mide el porcentaje de deployments que provocan una degradación en producción y requieren rollback, hotfix, fix forward o intervención manual.

### Cálculo

```text
Deployments que causaron fallo = 0
Total de deployments = 3

Change Failure Rate = 0 / 3 × 100
Change Failure Rate = 0%
```

### Resultado

Ninguno de los tres deployments causó una caída, degradación, rollback, hotfix o intervención manual.

Por lo tanto, el **Change Failure Rate fue de 0%**.

Este resultado es favorable, aunque debe considerarse que la muestra analizada contiene únicamente tres deployments.

---

## 7. Failed Deployment Recovery Time

### Definición

Failed Deployment Recovery Time mide cuánto tarda el equipo en restaurar el servicio después de que un deployment provoca una degradación que requiere intervención.

### Resultado

Durante el período analizado no se registraron deployments que provocaran fallos en producción.

Por lo tanto, esta métrica se registra como:

```text
No aplicable: no ocurrieron deployments fallidos que requirieran recuperación.
```

No se registra como cero minutos, porque no existió un incidente real del cual medir el tiempo de recuperación.

---

## 8. Comparación con DORA 2024

| Métrica                         |         Resultado del equipo | Rango de comparación DORA 2024                           | Evaluación                                      |
| ------------------------------- | ---------------------------: | -------------------------------------------------------- | ----------------------------------------------- |
| Deployment Frequency            | Un deployment cada 1.67 días | Entre una vez al día y una vez por semana                | El equipo se encuentra dentro de este rango     |
| Lead Time promedio              |              7 h 46 min 41 s | Menos de un día                                          | Cumple el rango                                 |
| Lead Time mediano               |                  10 min 12 s | Menos de una hora                                        | Cumple el rango más rápido                      |
| Change Failure Rate             |                           0% | Menor porcentaje representa mayor estabilidad            | Resultado favorable, con muestra limitada       |
| Failed Deployment Recovery Time |                 No aplicable | Menos de una hora representa el rango más rápido medible | No puede compararse porque no existieron fallos |

---

## 9. Propuestas de mejora

### Incrementar Deployment Frequency

Realizar deployments mediante cambios pequeños y frecuentes, evitando acumular varias funcionalidades antes de ejecutar el CD Pipeline.

Mantener la validación automática en staging antes de solicitar la aprobación de producción.

### Reducir Lead Time for Changes

El CD Pipeline #3 presentó un Lead Time cercano a 23 horas. Para reducir este tiempo se propone:

* Revisar staging inmediatamente después de completarse el CI Pipeline.
* Notificar al responsable cuando producción se encuentre esperando aprobación.
* Aprobar producción oportunamente después de validar staging.
* Mantener cambios pequeños para facilitar su revisión.

### Mantener bajo el Change Failure Rate

Continuar utilizando:

* Pruebas automáticas.
* Cobertura mínima del 80%.
* SonarQube.
* Trivy.
* Gitleaks.
* Validación previa en staging.

También se recomienda medir más deployments, debido a que tres ejecuciones representan una muestra pequeña.

### Preparar la recuperación ante fallos

Aunque no se registraron deployments fallidos, se recomienda:

* Mantener documentado el procedimiento de rollback.
* Realizar pruebas controladas de recuperación.
* Mantener actualizado el runbook.
* Configurar alertas que permitan detectar rápidamente fallos posteriores a un deployment.

El objetivo futuro debe ser recuperar el servicio en menos de una hora cuando ocurra un incidente real.

---

## 10. Conclusión

Durante el período analizado, el equipo realizó tres deployments exitosos en cinco días.

La frecuencia de despliegue fue de aproximadamente un deployment cada 1.67 días. El Lead Time promedio fue de 7 horas 46 minutos 41 segundos, mientras que el Lead Time típico, representado mediante la mediana, fue de 10 minutos 12 segundos.

El Change Failure Rate fue de 0%, debido a que ninguno de los deployments causó una degradación del servicio. El Failed Deployment Recovery Time no pudo calcularse porque no ocurrieron fallos que requirieran recuperación.

Los resultados muestran un desempeño inicial favorable en velocidad y estabilidad. Sin embargo, deben considerarse como una línea base académica, debido al período corto de medición, la cantidad reducida de deployments y el uso de un entorno de producción simulado.
