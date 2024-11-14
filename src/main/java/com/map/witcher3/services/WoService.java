package com.map.witcher3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.map.witcher3.entities.Wo;
import com.map.witcher3.repositories.WoRepository;
import java.util.List;

@Service
public class WoService {

    @Autowired
    private WoRepository woRepository;

    public List<Wo> getAllWo() {
        return woRepository.findAll();
    }
}
