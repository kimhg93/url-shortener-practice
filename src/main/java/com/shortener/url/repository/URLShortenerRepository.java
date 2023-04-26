package com.shortener.url.repository;

import com.shortener.url.model.URLShortener;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface URLShortenerRepository extends JpaRepository<URLShortener, Long> {

    @Override
    Optional<URLShortener> findById(Long aLong);
}
