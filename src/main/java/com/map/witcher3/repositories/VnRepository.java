package com.map.witcher3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.map.witcher3.entities.Vn;

public interface VnRepository extends JpaRepository<Vn, Integer> {
    // Możesz dodać dodatkowe metody do zapytań, jeśli potrzebujesz
}
