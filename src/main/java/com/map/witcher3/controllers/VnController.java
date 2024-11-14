package com.map.witcher3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.map.witcher3.entities.Vn;
import com.map.witcher3.services.VnService;

import java.util.List;

@RestController
public class VnController {

    @Autowired
    private VnService vnService;

    @GetMapping("/vn")
    public List<Vn> getVn() {
        return vnService.getAllVn();
    }
}