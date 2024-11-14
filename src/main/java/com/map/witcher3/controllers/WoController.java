package com.map.witcher3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.map.witcher3.entities.Wo;
import com.map.witcher3.services.WoService;

import java.util.List;

@RestController
public class WoController {

    @Autowired
    private WoService woService;

    @GetMapping("/wo")
    public List<Wo> getWo() {
        return woService.getAllWo();
    }
}