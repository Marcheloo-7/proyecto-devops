package com.proyecto.devops;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "app", "Proyecto DevOps",
                "status", "running"
        );
    }

    @GetMapping("/api/ping")
    public Map<String, String> ping() {
        return Map.of(
                "message", "pong",
                "status", "ok"
        );
    }
}
