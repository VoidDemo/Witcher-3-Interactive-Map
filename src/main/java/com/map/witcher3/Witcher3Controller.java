package com.map.witcher3;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Witcher3Controller {

    @GetMapping("/witcher3")
    public String redirectToIndex() {
        return "forward:/pages/index.html"; // Przekierowuje na /pages/index.html
    }
}
