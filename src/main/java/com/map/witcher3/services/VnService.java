package com.map.witcher3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.map.witcher3.entities.Vn;
import com.map.witcher3.repositories.VnRepository;

import java.util.List;

@Service
public class VnService {

    @Autowired
    private VnRepository vnRepository;

    public List<Vn> getAllVn() {
        return vnRepository.findAll();
    }
}