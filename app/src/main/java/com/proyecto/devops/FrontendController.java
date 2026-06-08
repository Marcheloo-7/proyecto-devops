package com.proyecto.devops;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping({"/app", "/frontend", "/dashboard"})
    public String frontend() {
        return "forward:/index.html";
    }
}
