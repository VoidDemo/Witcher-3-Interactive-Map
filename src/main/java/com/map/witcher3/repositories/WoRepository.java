package com.map.witcher3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.map.witcher3.entities.Wo;

public interface WoRepository extends JpaRepository<Wo, Integer> {
    // Możesz dodać dodatkowe metody do zapytań, jeśli potrzebujesz
}