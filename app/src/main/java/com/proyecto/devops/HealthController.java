package com.proyecto.devops;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    private static final Logger log = LoggerFactory.getLogger(HealthController.class);

    @GetMapping("/")
    public Map<String, String> home() {
        log.info("Home endpoint requested");

        return Map.of(
                "app", "Proyecto DevOps",
                "status", "running"
        );
    }

    @GetMapping("/api/ping")
    public Map<String, String> ping() {
        log.info("Ping endpoint requested");

        return Map.of(
                "message", "pong",
                "status", "ok"
        );
    }
}
